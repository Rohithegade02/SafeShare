import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
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
import type { UserSelectorProps, User } from './types';
import { getInitials } from '@/utils/formatters';

// Mock users - replace with actual API call
const mockUsers: User[] = [
    { id: '1', username: 'john_doe', email: 'john@example.com' },
    { id: '2', username: 'jane_smith', email: 'jane@example.com' },
    { id: '3', username: 'bob_wilson', email: 'bob@example.com' },
    { id: '4', username: 'alice_brown', email: 'alice@example.com' },
];

export const UserSelector = ({
    selectedUsers,
    onSelectionChange,
}: UserSelectorProps) => {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // TODO: Replace with actual API call
        setUsers(mockUsers);
    }, []);

    const toggleUser = (userId: string) => {
        const newSelection = selectedUsers.includes(userId)
            ? selectedUsers.filter(id => id !== userId)
            : [...selectedUsers, userId];
        onSelectionChange(newSelection);
    };

    const selectedUserObjects = users.filter(user =>
        selectedUsers.includes(user.id)
    );

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
                        {selectedUsers.length === 0
                            ? 'Select users...'
                            : `${selectedUsers.length} user(s) selected`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Search users..." />
                        <CommandList>
                            <CommandEmpty>No users found.</CommandEmpty>
                            <CommandGroup>
                                {users.map((user) => (
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
                                                className={cn(
                                                    'h-4 w-4',
                                                    selectedUsers.includes(user.id)
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {selectedUserObjects.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedUserObjects.map((user) => (
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
                                ×
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
};
