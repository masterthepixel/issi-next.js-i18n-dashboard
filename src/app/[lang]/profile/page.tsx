"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { JobSeekerProfile, profileAPI, useProfile } from "@/lib/api/profile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export default function ProfilePage({ params }: { params: { lang: string } }) {
    const router = useRouter();
    const intl = useIntl();
    const { isAuthenticated, isOnboardingCompleted, profile: userProfile } = useProfile();

    const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    useEffect(() => {
        // Redirect if not authenticated
        if (!isAuthenticated) {
            router.push(`/${params.lang}/auth/login`);
            return;
        }

        // Redirect to setup if onboarding not completed
        if (!isOnboardingCompleted) {
            router.push(`/${params.lang}/profile/setup`);
            return;
        }

        // Load profile data
        const loadProfile = async () => {
            try {
                const profileData = await profileAPI.getMyProfile();
                if (profileData) {
                    setProfile(profileData);
                    setCompletionPercentage(profileAPI.calculateProfileCompletion(profileData));
                } else {
                    // Profile not found, redirect to setup
                    router.push(`/${params.lang}/profile/setup`);
                }
            } catch (error) {
                console.error("Failed to load profile:", error);
                alert("Failed to load profile. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        loadProfile();
    }, [isAuthenticated, isOnboardingCompleted, router, params.lang]);

    const handleRefreshProfile = async () => {
        setIsLoading(true);
        try {
            const updatedProfile = await profileAPI.getMyProfile();
            if (updatedProfile) {
                setProfile(updatedProfile);
                setCompletionPercentage(profileAPI.calculateProfileCompletion(updatedProfile));
            }
        } catch (error) {
            console.error("Failed to refresh profile:", error);
            alert("Failed to refresh profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated || !isOnboardingCompleted) {
        return null; // Will redirect in useEffect
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">
                            <FormattedMessage id="profile.loading" defaultMessage="Loading your profile..." />
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                        <FormattedMessage
                            id="profile.notFound"
                            defaultMessage="Profile not found."
                        />
                    </p>
                    <Link
                        href={`/${params.lang}/profile/setup`}
                        className="inline-block"
                    >
                        <Button>
                            <FormattedMessage
                                id="profile.createSetup"
                                defaultMessage="Set Up Profile"
                            />
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <Card className="mb-6">
                    <CardHeader>
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-8 text-white rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-white text-3xl mb-2">
                                        <FormattedMessage
                                            id="profile.title"
                                            defaultMessage="Your Profile"
                                        />
                                    </CardTitle>
                                    <p className="text-green-100">
                                        <FormattedMessage
                                            id="profile.welcomeBack"
                                            defaultMessage="Welcome back to your profile dashboard"
                                        />
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">{profile.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        <FormattedMessage
                                            id="profile.lastUpdated"
                                            defaultMessage="Last updated:"
                                        />{" "}
                                        {new Date(profile.updatedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Profile Completion Status */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="">
                                <FormattedMessage
                                    id="profile.completion.title"
                                    defaultMessage="Profile Completion"
                                />
                            </h2>
                            <Button
                                variant="outline"
                                onClick={handleRefreshProfile}
                                disabled={isLoading}
                            >
                                <FormattedMessage
                                    id="profile.refresh"
                                    defaultMessage="Refresh"
                                />
                            </Button>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex-1">
                                <Progress value={completionPercentage} className="h-3" />
                            </div>
                            <div className="text-2xl font-bold">
                                {completionPercentage}%
                            </div>
                        </div>

                        {completionPercentage < 100 && (
                            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                <h3 className="text-yellow-900 dark:text-yellow-100 mb-2">
                                    <FormattedMessage
                                        id="profile.improve.title"
                                        defaultMessage="Ways to improve your profile:"
                                    />
                                </h3>
                                <ul className="space-y-1 text-sm">
                                    {!profile.resume && (
                                        <li>• <FormattedMessage
                                            id="profile.improve.resume"
                                            defaultMessage="Add your resume to increase job match accuracy"
                                        /></li>
                                    )}
                                    {(!profile.workExperience || profile.workExperience.length === 0) && (
                                        <li>• <FormattedMessage
                                            id="profile.improve.experience"
                                            defaultMessage="Add your work experience"
                                        /></li>
                                    )}
                                    {(!profile.education || profile.education.length === 0) && (
                                        <li>• <FormattedMessage
                                            id="profile.improve.education"
                                            defaultMessage="Add your educational background"
                                        /></li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Profile Information Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Basic Information */}
                    <Card>
                        <CardContent className="pt-6">
                            <h2 className="mb-4">
                                <FormattedMessage
                                    id="profile.basic.title"
                                    defaultMessage="Basic Information"
                                />
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground">
                                        <FormattedMessage id="profile.name" defaultMessage="Full Name" />
                                    </label>
                                    <p className="text-foreground">{profile.name}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground">
                                        <FormattedMessage id="profile.email" defaultMessage="Email" />
                                    </label>
                                    <p className="text-foreground">{profile.email}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground">
                                        <FormattedMessage id="profile.type" defaultMessage="Account Type" />
                                    </label>
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {profile.userType === "JOB_SEEKER" ? "Job Seeker" : profile.userType}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t">
                                <Link href={`/${params.lang}/profile/edit`}>
                                    <Button>
                                        <FormattedMessage
                                            id="profile.editBasic"
                                            defaultMessage="Edit Basic Info"
                                        />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* About Section */}
                    <Card>
                        <CardContent className="pt-6">
                            <h2 className="mb-4">
                                <FormattedMessage
                                    id="profile.about.title"
                                    defaultMessage="About You"
                                />
                            </h2>

                            <div className="space-y-4">
                                {profile.about ? (
                                    <p className="text-foreground">{profile.about}</p>
                                ) : (
                                    <p className="text-muted-foreground italic">
                                        <FormattedMessage
                                            id="profile.about.empty"
                                            defaultMessage="No information provided yet."
                                        />
                                    </p>
                                )}
                            </div>

                            <div className="mt-6 pt-4 border-t">
                                <Link href={`/${params.lang}/profile/edit`}>
                                    <Button variant="outline">
                                        <FormattedMessage
                                            id="profile.editAbout"
                                            defaultMessage="Edit About"
                                        />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card className="mt-6">
                    <CardContent className="pt-6">
                        <h2 className="mb-4">
                            <FormattedMessage
                                id="profile.quickActions"
                                defaultMessage="Quick Actions"
                            />
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href={`/${params.lang}/profile/edit`}>
                                <div className="flex items-center justify-center p-8 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors">
                                    <div className="text-center">
                                        <div className="text-blue-600 text-4xl mb-3">✏️</div>
                                        <div className="font-medium text-blue-900 dark:text-blue-100">
                                            <FormattedMessage
                                                id="profile.action.edit"
                                                defaultMessage="Edit Profile"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link href={`/${params.lang}/jobs`}>
                                <div className="flex items-center justify-center p-8 bg-green-50 dark:bg-green-950 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition-colors">
                                    <div className="text-center">
                                        <div className="text-green-600 text-4xl mb-3">🔍</div>
                                        <div className="font-medium text-green-900 dark:text-green-100">
                                            <FormattedMessage
                                                id="profile.action.jobs"
                                                defaultMessage="Find Jobs"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {profile.resume ? (
                                <button className="flex items-center justify-center p-8 bg-purple-50 dark:bg-purple-950 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-lg transition-colors">
                                    <div className="text-center">
                                        <div className="text-purple-600 text-4xl mb-3">📄</div>
                                        <div className="font-medium text-purple-900 dark:text-purple-100">
                                            <FormattedMessage
                                                id="profile.action.resume"
                                                defaultMessage="View Resume"
                                            />
                                        </div>
                                    </div>
                                </button>
                            ) : (
                                <Link href={`/${params.lang}/profile/upload-resume`}>
                                    <div className="flex items-center justify-center p-8 bg-purple-50 dark:bg-purple-950 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-lg transition-colors">
                                        <div className="text-center">
                                            <div className="text-purple-600 text-4xl mb-3">📎</div>
                                            <div className="font-medium text-purple-900 dark:text-purple-100">
                                                <FormattedMessage
                                                    id="profile.action.uploadResume"
                                                    defaultMessage="Upload Resume"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}