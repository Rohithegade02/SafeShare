import { UploadButton } from "@/components/molecules";
import type { DashboardSideBarProps } from "../types";
import { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/route";
import { Share2, FileText } from "lucide-react";
import { Button } from "@/components/atoms/button";

export const DashboardSideBar = memo(({
    onFileUpload,
    isUploading,
}: DashboardSideBarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="flex-[0.15] flex flex-col my-10 px-4 gap-4">
            <div className="flex flex-col gap-2">
                <UploadButton
                    onUpload={onFileUpload}
                    multiple={true}
                    disabled={isUploading}
                />
            </div>

            <nav className="flex flex-col gap-2 mt-4">
                <Button
                    variant={isActive(ROUTES.shared) ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => navigate(ROUTES.shared)}
                >
                    <Share2 className="h-4 w-4" />
                    Shared with Me
                </Button>

                <Button
                    variant={isActive(ROUTES.activity) ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => navigate(ROUTES.activity)}
                >
                    <FileText className="h-4 w-4" />
                    Audit Logs
                </Button>
            </nav>
        </div>
    );
});
DashboardSideBar.displayName = "DashboardSideBar";
