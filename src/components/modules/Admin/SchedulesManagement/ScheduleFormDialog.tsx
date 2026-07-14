import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createSchedule } from "@/services/admin/schedulesManagement";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2).toString().padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

interface IScheduleFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ScheduleFormDialog = ({
  open,
  onClose,
  onSuccess,
}: IScheduleFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createSchedule, null);
  const prevStateRef = useRef(state);

  // Handle success/error from server
  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;
    if (state?.success) {
      toast.success(state.message || "Schedule created successfully");
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Create Schedule</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          autoComplete="off"
          className="flex flex-col flex-1 min-h-0"
        >
          {/* Timezone Offset */}
          <input
            type="hidden"
            name="timezoneOffset"
            value={new Date().getTimezoneOffset().toString()}
          />
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Start Date */}
            <Field>
              <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                autoComplete="off"
                defaultValue={state?.formData?.startDate || ""}
              />
              <InputFieldError field="startDate" state={state} />
            </Field>

            {/* End Date */}
            <Field>
              <FieldLabel htmlFor="endDate">End Date</FieldLabel>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                autoComplete="off"
                defaultValue={state?.formData?.endDate || ""}
              />
              <InputFieldError field="endDate" state={state} />
            </Field>

            {/* Start Time */}
            <Field>
              <FieldLabel htmlFor="startTime">Start Time</FieldLabel>
              <select
                id="startTime"
                name="startTime"
                defaultValue={state?.formData?.startTime || ""}
                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-slate-900 flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="" disabled hidden>Select Start Time</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Example: 09:00 (24-hour format)
              </p>
              <InputFieldError field="startTime" state={state} />
            </Field>

            {/* End Time */}
            <Field>
              <FieldLabel htmlFor="endTime">End Time</FieldLabel>
              <select
                id="endTime"
                name="endTime"
                defaultValue={state?.formData?.endTime || ""}
                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-slate-900 flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="" disabled hidden>Select End Time</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Example: 17:00 (24-hour format). Schedules will be created in
                30-minute intervals.
              </p>
              <InputFieldError field="endTime" state={state} />
            </Field>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Schedule"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleFormDialog;
