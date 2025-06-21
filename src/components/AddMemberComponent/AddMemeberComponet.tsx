import React from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AddMemberComponent: React.FC = () => {
    // Hier später Userdaten fetchen und als Optionen einfügen
    return (
        <div>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Member's" />
                </SelectTrigger>
                <SelectContent>
                    {/* Dynamisch gefetchte User als <SelectItem> einfügen */}
                </SelectContent>
            </Select>
        </div>
    );
};

export default AddMemberComponent;
