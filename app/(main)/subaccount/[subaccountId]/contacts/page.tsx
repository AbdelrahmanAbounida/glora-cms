import ContactTable from "@/components/tables/contact/contact-table";
import { Button } from "@/components/ui/button";
import React from "react";

const SubaccountSContacts = () => {
  return (
    <div className="flex flex-col p-3 h-screen">
      <h1 className="text-3xl font-medium">Contacts</h1>
      <Button className="max-w-[150px] mt-4">Create Contact</Button>
      <ContactTable />
    </div>
  );
};

export default SubaccountSContacts;
