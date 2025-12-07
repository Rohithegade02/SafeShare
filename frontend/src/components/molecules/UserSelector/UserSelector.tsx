import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
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


export const UserSelector = ({
    users,
}: UserSelectorProps) => {
    const [open, setOpen] = useState(false);

    // Ensure users is always an array
    const userList = users || [];
    console.log(users);

    const toggleUser = (userId: string) => {
        // TODO: Implement user selection toggle if needed
        console.log('Toggle user:', userId);
    };

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
                        {userList.length === 0
                            ? 'Select users...'
                            : `${userList.length} user(s) selected`}
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
                                                className="h-4 w-4 opacity-100"
                                            />
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {userList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {userList.map((user) => (
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
