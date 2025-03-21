"use client";

import AddWordDialog from "@/components/AddWordDialog";
import { useEffect, useState } from "react";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { PaginationModel } from "@/shared/model/PaginationModel";
import Header from "@/components/header";
import Breadcrumb from "@/components/Breadcrumd";

export default async function Page() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Admin', href: '/admin' },
        { label: 'Add Word', href: '/admin/add-word' },
    ];



    useEffect(() => {

    }, [])

    return (
        <div className="relative">
            <Header></Header>
            <div
                className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            ></div>
            <div className="relative pt-16 text-dark-100 h-screen">
                <div className="container mx-auto mt-4 px-4">
                    <Breadcrumb pages={breadcrumbItems} />
                </div>
                <div className="container mx-auto mt-4 p-4">
                    <AddWordDialog ></AddWordDialog>
                </div>
            </div>
        </div>

    )
}