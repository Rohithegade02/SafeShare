import { Input } from "@/components/atoms/input"
import { Search, RefreshCw, UserIcon, LogOut } from "lucide-react"
import type { DashboardHeaderProps } from "../types"
import { Button } from "@/components/atoms/button"
import { memo } from "react"

export const DashboardHeader = memo(({
    user,
    searchQuery,
    onSearchChange,
    onRefresh,
    isLoading,
    onLogout,
}: DashboardHeaderProps) => {
    console.log("header render")
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">SafeShare</span>
                </div>
                <div className="flex-1 max-w-2xl mx-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search in Drive"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10 bg-muted/50 border-none focus-visible:ring-1"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={onRefresh} disabled={isLoading}>
                        <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50">
                        <UserIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">{user?.username}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onLogout}>
                        <LogOut className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
});

DashboardHeader.displayName = 'DashboardHeader';