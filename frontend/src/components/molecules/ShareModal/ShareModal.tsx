import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/atoms/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/tabs';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/atoms/select';
import type { ShareModalProps } from './types';
import { Users, Link2, Copy, Check } from 'lucide-react';
import { UserSelector } from '../UserSelector';
import { useShareModal } from './useShareModal';

export const ShareModal = ({
    fileId,
    fileName,
    isOpen,
    onClose,
    onShareWithUsers,
    onGenerateLink,
}: ShareModalProps) => {
    const { selectedUsers, setSelectedUsers, expiryTime, setExpiryTime, shareLink, copied, loading, handleShareWithUsers, handleGenerateLink, copyToClipboard } = useShareModal({
        onShareWithUsers,
        onGenerateLink,
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>Share File</DialogTitle>
                    <DialogDescription>
                        Share "{fileName}" with other users or generate a shareable link
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="users" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="users" className="gap-2">
                            <Users className="h-4 w-4" />
                            Share with Users
                        </TabsTrigger>
                        <TabsTrigger value="link" className="gap-2">
                            <Link2 className="h-4 w-4" />
                            Share via Link
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="users" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label>Select Users</Label>
                            <UserSelector
                                selectedUsers={selectedUsers}
                                onSelectionChange={setSelectedUsers}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="user-expiry">Link Expiry (Optional)</Label>
                            <Select value={expiryTime} onValueChange={setExpiryTime}>
                                <SelectTrigger id="user-expiry">
                                    <SelectValue placeholder="Never expires" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Never expires</SelectItem>
                                    <SelectItem value="1">1 hour</SelectItem>
                                    <SelectItem value="24">24 hours</SelectItem>
                                    <SelectItem value="168">7 days</SelectItem>
                                    <SelectItem value="720">30 days</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                🎁 Bonus Feature: Set expiration time for shares
                            </p>
                        </div>

                        <Button
                            onClick={handleShareWithUsers}
                            disabled={selectedUsers.length === 0 || loading}
                            className="w-full"
                        >
                            {loading ? 'Sharing...' : `Share with ${selectedUsers.length} user(s)`}
                        </Button>
                    </TabsContent>

                    <TabsContent value="link" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="link-expiry">Link Expiry (Optional)</Label>
                            <Select value={expiryTime} onValueChange={setExpiryTime}>
                                <SelectTrigger id="link-expiry">
                                    <SelectValue placeholder="Never expires" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Never expires</SelectItem>
                                    <SelectItem value="1">1 hour</SelectItem>
                                    <SelectItem value="24">24 hours</SelectItem>
                                    <SelectItem value="168">7 days</SelectItem>
                                    <SelectItem value="720">30 days</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                🎁 Bonus Feature: Set expiration time for links
                            </p>
                        </div>

                        {!shareLink ? (
                            <Button
                                onClick={handleGenerateLink}
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'Generating...' : 'Generate Share Link'}
                            </Button>
                        ) : (
                            <div className="space-y-2">
                                <Label>Share Link</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={shareLink}
                                        readOnly
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={copyToClipboard}
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Only authenticated users can access this link
                                </p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
