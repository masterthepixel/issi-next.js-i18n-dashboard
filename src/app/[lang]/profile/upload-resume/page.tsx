"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { profileAPI, useProfile, validateResumeFile } from "@/lib/api/profile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export default function UploadResumePage({ params }: { params: { lang: string } }) {
    const router = useRouter();
    const intl = useIntl();
    const { isAuthenticated, isOnboardingCompleted } = useProfile();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string>("");
    const [uploadedUrl, setUploadedUrl] = useState<string>("");

    // Check authentication redirects
    useState(() => {
        if (!isAuthenticated) {
            router.push(`/${params.lang}/auth/login`);
        } else if (!isOnboardingCompleted) {
            router.push(`/${params.lang}/profile/setup`);
        }
    });

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file
        const validation = validateResumeFile(file);

        if (!validation.valid) {
            setError(validation.error!);
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
        setError("");
        setUploadedUrl("");
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];

            // Validate file
            const validation = validateResumeFile(file);

            if (!validation.valid) {
                setError(validation.error!);
                setSelectedFile(null);
                return;
            }

            setSelectedFile(file);
            setError("");
            setUploadedUrl("");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadProgress(0);
        setError("");

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const result = await profileAPI.uploadResume(selectedFile);

            clearInterval(progressInterval);
            setUploadProgress(100);
            setUploadedUrl(result.resumeUrl);

            // Redirect to profile page after a short delay
            setTimeout(() => {
                router.push(`/${params.lang}/profile`);
            }, 2000);

        } catch (error) {
            console.error("Upload failed:", error);
            setError(
                intl.formatMessage({
                    id: "profile.upload.error",
                    defaultMessage: "Failed to upload resume. Please try again."
                })
            );
            setUploadProgress(0);
        } finally {
            setIsUploading(false);
        }
    };

    const resetUpload = () => {
        setSelectedFile(null);
        setError("");
        setUploadedUrl("");
        setUploadProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    if (!isAuthenticated) {
        return null; // Will redirect
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <Card className="mb-6">
                    <CardHeader>
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-8 text-white rounded-t-lg">
                            <div className="text-center">
                                <div className="text-4xl mb-4">📄</div>
                                <CardTitle className="text-white">
                                    <FormattedMessage
                                        id="profile.uploadResume.title"
                                        defaultMessage="Upload Your Resume"
                                    />
                                </CardTitle>
                                <p className="text-purple-100 mt-2">
                                    <FormattedMessage
                                        id="profile.uploadResume.description"
                                        defaultMessage="Upload your resume to get better job matches and improve your profile completion"
                                    />
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Upload Area */}
                <Card>
                    <CardContent className="p-8">
                        {!uploadedUrl ? (
                            <>
                                {/* Drag and Drop Area */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    className="border-2 border-dashed rounded-lg p-12 text-center transition-colors hover:border-primary/50"
                                >
                                    {selectedFile ? (
                                        <div>
                                            <div className="text-green-600 text-6xl mb-4">✅</div>
                                            <h3 className="text-green-900 mb-2">
                                                <FormattedMessage
                                                    id="profile.upload.selected"
                                                    defaultMessage="File Selected"
                                                />
                                            </h3>
                                            <p className="text-muted-foreground mb-4">
                                                {selectedFile.name}
                                            </p>
                                            <div className="" text-caption7133>
                                                {selectedFile.size < 1024 * 1024
                                                    ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                                                    : `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
                                                }
                                            </div>
                                            <div className="flex justify-center space-x-3">
                                                <Button onClick={() => fileInputRef.current?.click()}>
                                                    <FormattedMessage
                                                        id="profile.upload.chooseAnother"
                                                        defaultMessage="Choose Another"
                                                    />
                                                </Button>
                                                <Button variant="outline" onClick={resetUpload}>
                                                    <FormattedMessage
                                                        id="profile.upload.cancel"
                                                        defaultMessage="Cancel"
                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="text-muted-foreground text-6xl mb-4">📤</div>
                                            <h3 className="mb-2">
                                                <FormattedMessage
                                                    id="profile.upload.dropFiles"
                                                    defaultMessage="Drop your resume file here"
                                                />
                                            </h3>
                                            <p className="text-muted-foreground mb-8">
                                                <FormattedMessage
                                                    id="profile.upload.browse"
                                                    defaultMessage="or click to browse files"
                                                />
                                            </p>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                onChange={handleFileSelect}
                                                accept=".pdf,.doc,.docx"
                                                className="hidden"
                                            />
                                            <Button onClick={() => fileInputRef.current?.click()}>
                                                <FormattedMessage
                                                    id="profile.upload.browseButton"
                                                    defaultMessage="Browse Files"
                                                />
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* File Requirements */}
                                <div className="mt-6 bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                                    <h4 className="text-blue-900 dark:text-blue-100 mb-3">
                                        <FormattedMessage
                                            id="profile.upload.requirements.title"
                                            defaultMessage="File Requirements:"
                                        />
                                    </h4>
                                    <ul className="" text-caption11358>
                                        <li>• <FormattedMessage
                                            id="profile.upload.requirements.format"
                                            defaultMessage="PDF, DOC, or DOCX files only"
                                        /></li>
                                        <li>• <FormattedMessage
                                            id="profile.upload.requirements.size"
                                            defaultMessage="Maximum file size: 5MB"
                                        /></li>
                                        <li>• <FormattedMessage
                                            id="profile.upload.requirements.error"
                                            defaultMessage="File will be validated before upload"
                                        /></li>
                                    </ul>
                                </div>

                                {/* Error Display */}
                                {error && (
                                    <div className="mt-6 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                        <div className="flex">
                                            <div className="text-red-400 text-xl mr-3">⚠️</div>
                                            <div>
                                                <h4 className="text-red-900 dark:text-red-100">
                                                    <FormattedMessage
                                                        id="profile.upload.error.title"
                                                        defaultMessage="Upload Error"
                                                    />
                                                </h4>
                                                <p className="text-red-800 dark:text-red-200  " text-caption13338>{error}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Upload Button */}
                                {selectedFile && !error && (
                                    <div className="mt-6 text-center">
                                        <Button
                                            onClick={handleUpload}
                                            disabled={isUploading}
                                            className="px-8 py-3 text-lg"
                                        >
                                            {isUploading ? (
                                                <FormattedMessage
                                                    id="profile.upload.uploading"
                                                    defaultMessage="Uploading..."
                                                />
                                            ) : (
                                                <FormattedMessage
                                                    id="profile.upload.upload"
                                                    defaultMessage="Upload Resume"
                                                />
                                            )}
                                        </Button>
                                    </div>
                                )}

                                {/* Progress Bar */}
                                {isUploading && (
                                    <div className="mt-6">
                                        <div className="flex justify-between  " text-caption15153>
                                            <span>
                                                <FormattedMessage
                                                    id="profile.upload.progress"
                                                    defaultMessage="Upload Progress"
                                                />
                                            </span>
                                            <span>{uploadProgress}%</span>
                                        </div>
                                        <Progress value={uploadProgress} className="h-2" />
                                    </div>
                                )}
                            </>
                        ) : (
                            /* Success State */
                            <div className="text-center py-8">
                                <div className="text-green-600 text-6xl mb-4">🎉</div>
                                <h2 className="text-green-900 mb-2">
                                    <FormattedMessage
                                        id="profile.upload.success.title"
                                        defaultMessage="Resume Uploaded Successfully!"
                                    />
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    <FormattedMessage
                                        id="profile.upload.success.message"
                                        defaultMessage="Your resume has been uploaded and is now part of your profile."
                                    />
                                </p>
                                <div className="space-y-3">
                                    <Link href={`/${params.lang}/profile`}>
                                        <Button className="px-6 py-3">
                                            <FormattedMessage
                                                id="profile.upload.success.viewProfile"
                                                defaultMessage="View Your Profile"
                                            />
                                        </Button>
                                    </Link>
                                    <br />
                                    <Button variant="outline" onClick={resetUpload}>
                                        <FormattedMessage
                                            id="profile.upload.success.uploadAnother"
                                            defaultMessage="Upload Another Resume"
                                        />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Navigation Links */}
                <div className="mt-6 text-center">
                    <Link
                        href={`/${params.lang}/profile`}
                        className="text-primary hover:text-primary/80 font-medium"
                    >
                        ← <FormattedMessage
                            id="profile.upload.backToProfile"
                            defaultMessage="Back to Profile"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}