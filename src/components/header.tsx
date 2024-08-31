import Link from "next/link";
import AuthBlock from "./auth-block";
import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import paths from "@/path";

export default function Header() {
    return (
        <Navbar className='shadow mb-6'>
            <NavbarBrand>
                <Link
                    href={paths.home()}
                    className='font-bold'>
                    Discuss
                </Link>
            </NavbarBrand>
            <NavbarContent justify='center'>
                <NavbarItem>
                    <Input />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
                <AuthBlock />
            </NavbarContent>
        </Navbar>
    );
}
