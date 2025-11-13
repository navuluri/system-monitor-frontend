"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, EyeIcon, Trash2Icon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function Actions({ ip, port }: { ip: string; port: number }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleView = async () => {
    router.push("/dashboard?host=" + ip + "&port=" + port);
  };

  const handleDelete = async () => {
    /* const response = await deleteFile(filename);
         if (response.status === 204) {
             toast.success("Deletion Successful", {
                 description: response.message,
                 action: {
                     label: "OK",
                     onClick: () => {

                     },
                 }
             })
         } else {
             toast.success("Deletion Failure", {
                 description: response.message,
                 action: {
                     label: "OK",
                     onClick: () => {

                     },
                 }
             })
         }
         setOpen(false);
         router.refresh()*/
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className={"size-5 cursor-pointer"} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className={"cursor-pointer"}
          onClick={() => handleView()}
        >
          <EyeIcon />
          View
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600  focus:text-red-600 cursor-pointer"
            >
              <Trash2Icon className={"text-red-600"} /> Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div>
                  <Alert variant="destructive">
                    <AlertDescription>
                      <div className={"font-bold"}>
                        This action cannot be undone
                      </div>
                      <ul className="list-inside list-disc text-sm mt-4">
                        <li>The action deletes the file from the server</li>
                        <li>
                          All the embeddings and vectors related to this file
                          will be deleted permanently
                        </li>
                        <li>
                          The LLM may no longer provide valid answers to your
                          questions related to this document and can lead to LLM
                          hallucinations
                        </li>
                      </ul>
                      <div className={"text-green-700 mt-4"}>
                        Note: You can always re-upload the file to recreate the
                        embeddings and respective vectors
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
