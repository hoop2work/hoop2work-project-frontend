import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddMemberComponentProps {
  users: any[];
  onSelectUser: (userId: number) => void;
}

const AddMemberComponent: React.FC<AddMemberComponentProps> = ({ users, onSelectUser }) => {
  return (
    <div>
      <Select onValueChange={(value) => onSelectUser(Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Member" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available Members</SelectLabel>
            {users.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">No users available</div>
            ) : (
              users.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.username}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AddMemberComponent;
