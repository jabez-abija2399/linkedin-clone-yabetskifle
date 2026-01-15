"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationSchema } from "@/schemas/education.schema";
import { z } from "zod";
import { addEducation } from "@/server/actions/education.actions";
import { Input } from "@/components/ui/Input";
import Button from "../ui/Button";
import { X } from "lucide-react";

export function EducationForm({ onSuccess }: { onSuccess: () => void }) {
    const [isPending, setIsPending] = useState(false);
    // const [values, setValues] = useState({
    //     school: "",
    //     degree: "",
    //     fieldOfStudy: "",
    //     startDate: undefined,
    //     endDate: undefined,
    //     current: false,
    //     description: "",
    // });

    // Setup form with react-hook-form
    const form = useForm({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            school: "",
            degree: "",
            fieldOfStudy: "",
            startDate: undefined,
            endDate: undefined,
            current: false,
            description: "",
        }
    });

    const isCurrent = form.watch("current");

    async function onSubmit(values: z.infer<typeof educationSchema>) {
        setIsPending(true);
        const result = await addEducation(values);
        setIsPending(false);

        if (result.success) {
            onSuccess();
        } else {
            alert(result.error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-lg shadow-xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Add Education</h2>
                    <button onClick={onSuccess}><X className="h-6 w-6" /></button>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium"> School*</label>
                        <Input required {...form.register("school")} placeholder="Ex: Boston University" />
                        {form.formState.errors.school && <p className="text-red-500 text-xs">{form.formState.errors.school.message as string}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Degree</label>
                            <Input required {...form.register("degree")} placeholder="Ex: Bachelor's" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Field of Study</label>
                            <Input required {...form.register("fieldOfStudy")} placeholder="Ex: Computer Science" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Start Date</label>
                            <Input required type="date" {...form.register("startDate", { valueAsDate: true })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">End Date</label>
                            <Input
                                type="date"
                                {...form.register("endDate", { valueAsDate: true })}
                                disabled={isCurrent}
                            />
                            {form.formState.errors.endDate && <p className="text-red-500 text-xs">{form.formState.errors.endDate.message as string}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="currentStudy"
                            {...form.register("current")}
                            className="h-4 w-4"
                        />
                        <label htmlFor="currentStudy" className="text-sm">I am currently studying here</label>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea {...form.register("description")} placeholder="Activities, societies, etc."
                            className="w-full border rounded-md p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Saving..." : "Save Education"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}