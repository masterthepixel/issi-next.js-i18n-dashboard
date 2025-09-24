"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email address"),
    company: z.string().optional(),
    projectType: z.string().min(1, "Select a project type"),
    startDate: z.date({ required_error: "Select a start date" }),
    message: z.string().min(10, "Please provide a brief project description"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactFormISSI() {
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            projectType: "",
            startDate: undefined,
            message: "",
        },
        mode: "onTouched",
    });

    function onSubmit(data: ContactFormValues) {
        // TODO: Integrate with backend or email service
        alert("Thank you for contacting ISSI! We'll be in touch soon.");
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 border border-white/10 rounded-2xl p-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="sm:col-span-1">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} autoComplete="name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="sm:col-span-1">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="you@company.com" type="email" {...field} autoComplete="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem className="sm:col-span-1">
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input placeholder="Company (optional)" {...field} autoComplete="organization" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                        <FormItem className="sm:col-span-1">
                            <FormLabel>Project Type</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="web">Web App</SelectItem>
                                        <SelectItem value="mobile">Mobile App</SelectItem>
                                        <SelectItem value="ai">AI/ML</SelectItem>
                                        <SelectItem value="consulting">Consulting</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem className="sm:col-span-1">
                            <FormLabel>Desired Start Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    placeholder="Select date"
                                    className="w-full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                            <FormLabel>Project Details</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Briefly describe your project, goals, and timeline..." rows={4} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="sm:col-span-2 flex justify-end mt-2">
                    <Button type="submit" className="rounded-xl px-6 py-2.5 font-medium">
                        Send Inquiry
                    </Button>
                </div>
            </form>
        </Form>
    );
}
