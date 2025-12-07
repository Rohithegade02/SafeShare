import { memo, useCallback, useMemo, useState } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/atoms/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/atoms/popover';
import { Avatar, AvatarFallback } from '@/components/atoms/avatar';
import { Badge } from '@/components/atoms/badge';
import type { UserSelectorProps } from './types';
import { getInitials } from '@/utils/formatters';


export const UserSelector = memo(({
    users,
    onSelectionChange,
}: UserSelectorProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    const userList = users || [];

    const toggleUser = useCallback((userId: string) => {
        setSelectedUserIds((prev) => {
            const newSelection = prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId];

            onSelectionChange?.(newSelection);

            return newSelection;
        });
    }, []);

    const isUserSelected = (userId: string) => selectedUserIds.includes(userId);

    const selectedUsers = useMemo(() => userList.filter((user) => isUserSelected(user.id)), [userList, selectedUserIds]);

    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {selectedUserIds.length === 0
                            ? 'Select users...'
                            : `${selectedUserIds.length} user(s) selected`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Search users..." />
                        <CommandList>
                            <CommandEmpty>No users found.</CommandEmpty>
                            <CommandGroup>
                                {userList.map((user) => (
                                    <CommandItem
                                        key={user.id}
                                        value={user.email}
                                        onSelect={() => toggleUser(user.id)}
                                    >
                                        <div className="flex items-center gap-2 flex-1">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="text-xs">
                                                    {getInitials(user.username)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">
                                                    {user.username}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <Check
                                                className={`h-4 w-4 ${isUserSelected(user.id)
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                                    }`}
                                            />
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {selectedUsers.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedUsers.map((user) => (
                        <Badge
                            key={user.id}
                            variant="secondary"
                            className="gap-1 pr-1"
                        >
                            <Avatar className="h-4 w-4">
                                <AvatarFallback className="text-[10px]">
                                    {getInitials(user.username)}
                                </AvatarFallback>
                            </Avatar>
                            {user.username}
                            <button
                                onClick={() => toggleUser(user.id)}
                                className="ml-1 hover:bg-muted rounded-full p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
});
UserSelector.displayName = 'UserSelector';
