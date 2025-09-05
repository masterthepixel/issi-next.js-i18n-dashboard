"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { JobSeekerProfile, profileAPI, useProfile } from "@/lib/api/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import * as z from "zod";

// Form validation schema
const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    about: z.string().min(10, "Please provide at least 10 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileSetupPage({ params }: { params: { lang: string } }) {
    const router = useRouter();
    const intl = useIntl();
    const { isAuthenticated, isOnboardingCompleted } = useProfile();

    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState<Partial<JobSeekerProfile> | null>(null);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            about: "",
        },
    });

    useEffect(() => {
        // Redirect if not authenticated
        if (!isAuthenticated) {
            router.push(`/${params.lang}/auth/login`);
            return;
        }

        // Redirect if onboarding completed
        if (isOnboardingCompleted) {
            router.push(`/${params.lang}/profile`);
            return;
        }

        // Load existing profile data
        const loadProfile = async () => {
            try {
                const existingProfile = await profileAPI.getMyProfile();
                if (existingProfile) {
                    setProfile(existingProfile);
                    setCompletionPercentage(profileAPI.calculateProfileCompletion(existingProfile));

                    // Populate form
                    form.setValue("name", existingProfile.name || "");
                    form.setValue("about", existingProfile.about || "");
                }
            } catch (error) {
                console.error("Failed to load profile:", error);
            }
        };

        loadProfile();
    }, [isAuthenticated, isOnboardingCompleted, router, params.lang, form]);

    const onSubmit = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
            const profileData = {
                name: data.name,
                about: data.about,
                userType: "JOB_SEEKER" as const,
                onboardingCompleted: true,
                ...profile,
            };

            let updatedProfile: JobSeekerProfile;

            if (profile?.id) {
                // Update existing profile
                updatedProfile = await profileAPI.updateProfile(profileData);
            } else {
                // Create new profile
                updatedProfile = await profileAPI.createProfile(profileData);
            }

            // Update completion percentage
            const completion = profileAPI.calculateProfileCompletion(updatedProfile);
            setCompletionPercentage(completion);

            // Redirect to main profile page
            router.push(`/${params.lang}/profile`);
        } catch (error) {
            console.error("Failed to save profile:", error);
            alert("Failed to save profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <FormattedMessage
                                id="profile.setup.title"
                                defaultMessage="Complete Your Profile"
                            />
                        </CardTitle>
                        <CardDescription>
                            <FormattedMessage
                                id="profile.setup.description"
                                defaultMessage="Set up your job seeker profile to get started"
                            />
                        </CardDescription>
                        <div className="flex items-center justify-center space-x-4 mt-4">
                            <span className="text-sm text-muted-foreground">
                                <FormattedMessage
                                    id="profile.completion"
                                    defaultMessage="Profile Completion"
                                />
                            </span>
                            <div className="flex-1 max-w-xs">
                                <Progress value={completionPercentage} className="h-2" />
                            </div>
                            <span className="text-sm font-medium">{completionPercentage}%</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <FormattedMessage
                                                    id="profile.name"
                                                    defaultMessage="Full Name"
                                                />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={intl.formatMessage({
                                                        id: "profile.name.placeholder",
                                                        defaultMessage: "Enter your full name"
                                                    })}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="about"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <FormattedMessage
                                                    id="profile.about"
                                                    defaultMessage="About You"
                                                />
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={intl.formatMessage({
                                                        id: "profile.about.placeholder",
                                                        defaultMessage: "Tell us about yourself, your career goals, and what you're looking for..."
                                                    })}
                                                    className="min-h-[120px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                                        <FormattedMessage
                                            id="profile.setup.tips.title"
                                            defaultMessage="Tips to improve your profile:"
                                        />
                                    </h3>
                                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                        <li>• <FormattedMessage
                                            id="profile.setup.tips.resume"
                                            defaultMessage="Add your resume to get better job matches"
                                        /></li>
                                        <li>• <FormattedMessage
                                            id="profile.setup.tips.experience"
                                            defaultMessage="Include your work experience and skills"
                                        /></li>
                                        <li>• <FormattedMessage
                                            id="profile.setup.tips.education"
                                            defaultMessage="Add your educational background"
                                        /></li>
                                    </ul>
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <FormattedMessage
                                            id="profile.setup.saving"
                                            defaultMessage="Saving..."
                                        />
                                    ) : (
                                        <FormattedMessage
                                            id="profile.setup.save"
                                            defaultMessage="Save Profile"
                                        />
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}