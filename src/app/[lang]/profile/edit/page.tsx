"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Education,
    JobSeekerProfile,
    profileAPI,
    ProfileUpdateData,
    useProfile,
    WorkExperience
} from "@/lib/api/profile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export default function EditProfilePage({ params }: { params: { lang: string } }) {
    const router = useRouter();
    const intl = useIntl();
    const { isAuthenticated, isOnboardingCompleted } = useProfile();

    const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Form data
    const [formData, setFormData] = useState({
        name: "",
        about: "",
        workExperience: [] as WorkExperience[],
        education: [] as Education[],
        skills: [] as string[],
    });

    useEffect(() => {
        // Redirect if not authenticated
        if (!isAuthenticated) {
            router.push(`/${params.lang}/auth/login`);
            return;
        }

        // Redirect if onboarding not completed
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
                    setFormData({
                        name: profileData.name || "",
                        about: profileData.about || "",
                        workExperience: profileData.workExperience || [],
                        education: profileData.education || [],
                        skills: profileData.skills || [],
                    });
                } else {
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

    const updateFormData = (field: keyof typeof formData, value: string | number | boolean | WorkExperience[] | Education[] | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error if it exists
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const addWorkExperience = () => {
        const newExperience: WorkExperience = {
            id: `temp_${Date.now()}`,
            jobTitle: "",
            company: "",
            location: "",
            startDate: new Date().toISOString().split('T')[0],
            current: false,
            description: "",
        };

        setFormData(prev => ({
            ...prev,
            workExperience: [...prev.workExperience, newExperience]
        }));
    };

    const removeWorkExperience = (index: number) => {
        setFormData(prev => ({
            ...prev,
            workExperience: prev.workExperience.filter((_, i) => i !== index)
        }));
    };

    const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string | boolean | undefined) => {
        setFormData(prev => ({
            ...prev,
            workExperience: prev.workExperience.map((exp, i) =>
                i === index ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const addEducation = () => {
        const newEducation: Education = {
            id: `temp_${Date.now()}`,
            institution: "",
            degree: "",
            field: "",
            graduationDate: new Date().toISOString().split('T')[0],
        };

        setFormData(prev => ({
            ...prev,
            education: [...prev.education, newEducation]
        }));
    };

    const removeEducation = (index: number) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    const updateEducation = (index: number, field: keyof Education, value: string | number | undefined) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
            )
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!profile) return;

        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.about.trim()) {
            newErrors.about = "About section is required";
        } else if (formData.about.trim().length < 10) {
            newErrors.about = "About section must be at least 10 characters";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setSaving(true);
        try {
            const updateData: ProfileUpdateData = {
                name: formData.name,
                about: formData.about,
                workExperience: formData.workExperience,
                education: formData.education,
                skills: formData.skills,
            };

            const updatedProfile = await profileAPI.updateProfile(updateData);
            setProfile(updatedProfile);

            // Redirect back to profile
            router.push(`/${params.lang}/profile`);
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (!isAuthenticated || !isOnboardingCompleted) {
        return null; // Will redirect
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                        <FormattedMessage id="profile.loading" defaultMessage="Loading..." />
                    </p>
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
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl">
                                    <FormattedMessage
                                        id="profile.edit.title"
                                        defaultMessage="Edit Your Profile"
                                    />
                                </CardTitle>
                                <p className="text-muted-foreground mt-2">
                                    <FormattedMessage
                                        id="profile.edit.description"
                                        defaultMessage="Update your profile information to improve job matching"
                                    />
                                </p>
                            </div>
                            <Link href={`/${params.lang}/profile`}>
                                <Button variant="outline">
                                    <FormattedMessage
                                        id="profile.edit.cancel"
                                        defaultMessage="Cancel"
                                    />
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                </Card>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-8">
                                {/* Basic Information */}
                                <div>
                                    <h2 className="mb-4">
                                        <FormattedMessage
                                            id="profile.edit.basic.title"
                                            defaultMessage="Basic Information"
                                        />
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium">
                                                <FormattedMessage id="profile.name" defaultMessage="Full Name" /> *
                                            </label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => updateFormData("name", e.target.value)}
                                                placeholder={intl.formatMessage({ id: "profile.name.placeholder", defaultMessage: "Enter your full name" })}
                                                className={errors.name ? "border-red-500" : ""}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                <FormattedMessage id="profile.email" defaultMessage="Email" />
                                            </label>
                                            <Input
                                                value={profile?.email || ""}
                                                disabled
                                                className="bg-muted"
                                            />
                                            <p className="text-muted-foreground text-xs mt-1">
                                                <FormattedMessage
                                                    id="profile.edit.email.note"
                                                    defaultMessage="Email cannot be changed here"
                                                />
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            <FormattedMessage id="profile.about" defaultMessage="About You" /> *
                                        </label>
                                        <Textarea
                                            value={formData.about}
                                            onChange={(e) => updateFormData("about", e.target.value)}
                                            rows={6}
                                            placeholder={intl.formatMessage({
                                                id: "profile.about.placeholder",
                                                defaultMessage: "Tell us about yourself, your career goals, and what you're looking for..."
                                            })}
                                            className={`min-h-[120px] ${errors.about ? "border-red-500" : ""}`}
                                        />
                                        {errors.about && (
                                            <p className="text-red-500 text-sm mt-1">{errors.about}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Work Experience */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="">
                                            <FormattedMessage
                                                id="profile.edit.work.title"
                                                defaultMessage="Work Experience"
                                            />
                                        </h2>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={addWorkExperience}
                                        >
                                            + <FormattedMessage
                                                id="profile.edit.work.add"
                                                defaultMessage="Add Experience"
                                            />
                                        </Button>
                                    </div>

                                    {formData.workExperience.length === 0 ? (
                                        <div className="text-center py-8 bg-muted/20 rounded-lg">
                                            <div className="text-4xl mb-2">💼</div>
                                            <p className="text-muted-foreground">
                                                <FormattedMessage
                                                    id="profile.edit.work.empty"
                                                    defaultMessage="No work experience added yet"
                                                />
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {formData.workExperience.map((exp, index) => (
                                                <div key={exp.id || index} className="border rounded-lg p-4 bg-muted/20">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h3 className="">
                                                            <FormattedMessage
                                                                id="profile.edit.work.item"
                                                                defaultMessage="Experience {number}"
                                                                values={{ number: index + 1 }}
                                                            />
                                                        </h3>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeWorkExperience(index)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <FormattedMessage
                                                                id="profile.edit.work.remove"
                                                                defaultMessage="Remove"
                                                            />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                        <Input
                                                            placeholder={intl.formatMessage({ id: "profile.edit.work.jobTitle", defaultMessage: "Job Title" })}
                                                            value={exp.jobTitle}
                                                            onChange={(e) => updateWorkExperience(index, "jobTitle", e.target.value)}
                                                        />

                                                        <Input
                                                            placeholder={intl.formatMessage({ id: "profile.edit.work.company", defaultMessage: "Company" })}
                                                            value={exp.company}
                                                            onChange={(e) => updateWorkExperience(index, "company", e.target.value)}
                                                        />

                                                        <Input
                                                            placeholder={intl.formatMessage({ id: "profile.edit.work.location", defaultMessage: "Location" })}
                                                            value={exp.location}
                                                            onChange={(e) => updateWorkExperience(index, "location", e.target.value)}
                                                        />

                                                        <Input
                                                            type="date"
                                                            value={exp.startDate?.split('T')[0] || ""}
                                                            onChange={(e) => updateWorkExperience(index, "startDate", e.target.value)}
                                                        />

                                                        {!exp.current && (
                                                            <Input
                                                                type="date"
                                                                placeholder="End Date"
                                                                value={exp.endDate?.split('T')[0] || ""}
                                                                onChange={(e) => updateWorkExperience(index, "endDate", e.target.value)}
                                                            />
                                                        )}
                                                    </div>

                                                    <div className="flex items-center space-x-2 mb-4">
                                                        <input
                                                            type="checkbox"
                                                            id={`current-${index}`}
                                                            checked={exp.current || false}
                                                            onChange={(e) => updateWorkExperience(index, "current", e.target.checked)}
                                                        />
                                                        <label htmlFor={`current-${index}`} className="text-sm font-medium">
                                                            <FormattedMessage
                                                                id="profile.edit.work.current"
                                                                defaultMessage="Current Job"
                                                            />
                                                        </label>
                                                    </div>

                                                    <Textarea
                                                        placeholder={intl.formatMessage({
                                                            id: "profile.edit.work.description",
                                                            defaultMessage: "Job description and responsibilities..."
                                                        })}
                                                        value={exp.description}
                                                        onChange={(e) => updateWorkExperience(index, "description", e.target.value)}
                                                        rows={3}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Education */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="">
                                            <FormattedMessage
                                                id="profile.edit.education.title"
                                                defaultMessage="Education"
                                            />
                                        </h2>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={addEducation}
                                        >
                                            + <FormattedMessage
                                                id="profile.edit.education.add"
                                                defaultMessage="Add Education"
                                            />
                                        </Button>
                                    </div>

                                    {formData.education.length === 0 ? (
                                        <div className="text-center py-8 bg-muted/20 rounded-lg">
                                            <div className="text-4xl mb-2">🎓</div>
                                            <p className="text-muted-foreground">
                                                <FormattedMessage
                                                    id="profile.edit.education.empty"
                                                    defaultMessage="No education added yet"
                                                />
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {formData.education.map((edu, index) => (
                                                <div key={edu.id || index} className="border rounded-lg p-4 bg-muted/20">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h3 className="">
                                                            <FormattedMessage
                                                                id="profile.edit.education.item"
                                                                defaultMessage="Education {number}"
                                                                values={{ number: index + 1 }}
                                                            />
                                                        </h3>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeEducation(index)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <FormattedMessage
                                                                id="profile.edit.education.remove"
                                                                defaultMessage="Remove"
                                                            />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <Input
                                                            placeholder={intl.formatMessage({
                                                                id: "profile.edit.education.institution",
                                                                defaultMessage: "Institution"
                                                            })}
                                                            value={edu.institution}
                                                            onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                                        />

                                                        <Input
                                                            placeholder={intl.formatMessage({ id: "profile.edit.education.degree", defaultMessage: "Degree" })}
                                                            value={edu.degree}
                                                            onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                                        />

                                                        <Input
                                                            placeholder={intl.formatMessage({ id: "profile.edit.education.field", defaultMessage: "Field of Study" })}
                                                            value={edu.field}
                                                            onChange={(e) => updateEducation(index, "field", e.target.value)}
                                                        />

                                                        <Input
                                                            type="date"
                                                            value={edu.graduationDate?.split('T')[0] || ""}
                                                            onChange={(e) => updateEducation(index, "graduationDate", e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end space-x-4 pt-6 border-t">
                                    <Link href={`/${params.lang}/profile`}>
                                        <Button type="button" variant="outline">
                                            <FormattedMessage
                                                id="profile.edit.cancel"
                                                defaultMessage="Cancel"
                                            />
                                        </Button>
                                    </Link>
                                    <Button type="submit" disabled={saving}>
                                        {saving ? (
                                            <FormattedMessage
                                                id="profile.edit.saving"
                                                defaultMessage="Saving..."
                                            />
                                        ) : (
                                            <FormattedMessage
                                                id="profile.edit.save"
                                                defaultMessage="Save Changes"
                                            />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
}