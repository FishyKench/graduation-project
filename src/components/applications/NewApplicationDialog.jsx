import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import NewApplicationForm from "./NewApplicationForm";

const NewApplicationDialog = ({ open, onOpenChange, onSuccess }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <NewApplicationForm
          onClose={() => onOpenChange(false)}
          onSuccess={() => {
            onSuccess?.();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewApplicationDialog;
