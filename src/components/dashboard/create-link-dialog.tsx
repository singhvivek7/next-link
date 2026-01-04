"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Link as LinkIcon, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreateLink } from "@/hooks/use-create-link"

// Reuse schema or define strict url schema here
const createLinkSchema = z.object({
    url: z.string().url({ message: "Please enter a valid URL (e.g., https://example.com)" }),
})

interface CreateLinkDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateLinkDialog({ open, onOpenChange }: CreateLinkDialogProps) {
    const { mutate: createLink, isPending } = useCreateLink()

    const form = useForm<z.infer<typeof createLinkSchema>>({
        resolver: zodResolver(createLinkSchema),
        defaultValues: {
            url: "",
        },
    })

    const onSubmit = (values: z.infer<typeof createLinkSchema>) => {
        createLink(values, {
            onSuccess: () => {
                form.reset()
                onOpenChange(false)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Link</DialogTitle>
                    <DialogDescription>
                        Paste a long URL to create a shortened version.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Destination URL</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <div className="absolute pl-3 text-muted-foreground pointer-events-none">
                                                <LinkIcon className="h-4 w-4" />
                                            </div>
                                            <Input
                                                placeholder="https://example.com/long-url"
                                                className="pl-9"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="sm:justify-end">
                            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Link
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
