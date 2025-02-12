"use client"

import {ChevronDown} from "lucide-react";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";

type Props = {
    className?: string,
    items: { value: string, label: string }[];
}

export const CustomSelect = ({items, className}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const selectRef = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState<number>(-1);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef?.current?.contains(event?.target as Node) && !selectRef?.current?.contains(event?.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div
            className={cn(`bg-[#DDDDDD80] h-10 w-52 select-none relative rounded-md px-4 flex items-center border shadow`, className && className)}>
            <div ref={selectRef}
                 className={cn("flex w-full justify-between items-center cursor-pointer", active < 0 ? "text-muted-foreground" : "text-black")}
                 onClick={toggleDropdown}>
                {active < 0 ? "Select" : items[active].label}
                <ChevronDown className="w-4 h-4 text-gray-400"/>
            </div>
            {isOpen && (
                <ul ref={dropdownRef}
                    className={`z-40 absolute top-full left-0 mt-1 w-full bg-[#D8D8D8] border rounded-md shadow-lg max-h-[16rem] overflow-y-auto`}>
                    {
                        items
                            // .filter((_, index) => index !== active)
                            .map((item, index) => (
                            <li key={index}
                                className={cn("p-2 hover:bg-gray-200 cursor-pointer h-full w-full", index === 0 && "rounded-t-md", index === items.length - 1 && "rounded-b-md")}
                                onClick={() => {
                                    setActive(index);
                                    setIsOpen(false);
                                }}>{item.label}</li>
                        ))
                    }
                </ul>
            )}
        </div>
    )
}