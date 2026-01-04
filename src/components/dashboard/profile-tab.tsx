"use client"

import { Calendar, Mail, User } from "lucide-react"

import { GeneralLoader } from '@/components/general-loader';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProfile } from "@/hooks/use-profile"

export function ProfileTab() {
    const {
        data: profile,
        isLoading: loading,
        error,
        refetch
    } = useProfile()

    if (loading) {
        return (
            <GeneralLoader
                title="Loading Profile"
                description="Please wait while we fetch your profile information..."
            />
        )
    }

    if (error) {
        return (
            <div className="bg-destructive/10 border border-destructive/20 rounded-none p-6">
                <p className="text-destructive font-medium">Error loading profile</p>
                <p className="text-sm text-muted-foreground mt-1">{error instanceof Error ? error.message : "An error occurred"}</p>
                <Button
                    onClick={() => refetch()}
                    variant="outline"
                    className="mt-4 rounded-none"
                >
                    Try Again
                </Button>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="bg-muted/50 border border-border rounded-none p-6">
                <p className="text-muted-foreground">No profile data available</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-card border border-border rounded-none p-6">
                <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                        {profile?.data?.avatar && <AvatarImage src={profile?.data?.avatar} alt={profile?.data?.name} />}
                        <AvatarFallback className="bg-primary/10 text-primary text-3xl font-semibold">
                            {profile?.data?.name?.[0]?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold">{profile?.data?.name}</h2>
                            <Badge variant={profile?.data?.plan?.toLowerCase() === "basic" ? "outline" : "default"}>{profile?.data?.plan}</Badge>
                        </div>
                        <p className="text-muted-foreground">{profile?.data?.email}</p>
                    </div>
                </div>
            </div>

            {/* Profile Information */}
            <div className="bg-card border border-border rounded-none p-6">
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>

                <div className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={profile?.data?.name}
                            readOnly
                            className="rounded-none bg-muted"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={profile?.data?.email}
                            readOnly
                            className="rounded-none bg-muted"
                        />
                    </div>

                    {/* Member Since */}
                    <div className="space-y-2">
                        <Label htmlFor="created" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Member Since
                        </Label>
                        <Input
                            id="created"
                            value={new Date(profile?.data?.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                            readOnly
                            className="rounded-none bg-muted"
                        />
                    </div>

                    {/* User ID */}
                    <div className="space-y-2">
                        <Label htmlFor="userId">User ID</Label>
                        <Input
                            id="userId"
                            value={profile?.data?.id}
                            readOnly
                            className="rounded-none bg-muted font-mono text-xs"
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="bg-card border border-border rounded-none p-6">
                <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-none">
                        Edit Profile
                    </Button>
                    <Button variant="outline" className="rounded-none">
                        Change Password
                    </Button>
                </div>
            </div>
        </div>
    )
}
