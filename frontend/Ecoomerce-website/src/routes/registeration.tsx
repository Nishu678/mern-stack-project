import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "@/components/store/auth";
import { api } from "@/api/AuthApi";

export const Route = createFileRoute("/registeration")({
  component: RouteComponent,
});

const scehma = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    isEmployed: z.boolean(),
    designation: z.string().optional(),
    //here not work validation because it depend upon isEmpoyeed SO USING refine
    gender: z.enum(["male", "female", "other"], {
      message: "Gender is required",
    }),
    //enum is used to check the listed values and if the value is not in the list then it will throw an error
    phone: z.array(
      z.object({
        number: z.string(),
      }),
    ), // array of objects becuase there can be mutiple phone numbers
    profileImage: z.any(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Accept terms",
    }),
    // acceptTerms: z.literal(true, {
    //   errorMap: () => ({ message: "Accept terms" }),
    // }), //checkbox validation always use z.literal
  })
  .refine(
    (data) => {
      if (data.isEmployed) return !!data.designation; //return false if data.designation is empty then go to show the error and return true if data.designation is not empty
      return true;
    },
    {
      message: "Designation is required",
      path: ["designation"],
    },
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof scehma>;
//z.infer<zod schema> to get the type of the schema instead to type manually

function RouteComponent() {
  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(scehma),
    defaultValues: {
      isEmployed: false,
      designation: "",
      gender: undefined,
      phone: [{ number: "" }],
      acceptTerms: false,
    },
  });

  const isEmployed = watch("isEmployed");
  //Show/hide fields based on selection using the watch

  //useForm → Form manager
  // register → Connect input from react hook form
  // control → Connect custom input
  // handleSubmit → Submit handler
  // watch → Live tracking
  // errors → Validation messages
  // zod → Validation rules book
  // zodResolver-> USED TO CONNECT ZOD WITH REACT HOOK FORM

  //usefieldarray is used to add and remove fields dynamically using the react hook form
  //fields is used for rendering the fields  that added
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phone",
  });

  // const registeration = async (data: FormData) => {
  //   console.log("Original Form Data:", data);

  //   const payload = {
  //     username: data.fullName, // ✅ map
  //     email: data.email,
  //     password: data.password,
  //     phone: data.phone, // ✅ extract first number
  //   };

  //   console.log("Sending Payload:", payload);

  //   const response = await fetch("http://localhost:8000/api/auth/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   });

  //   const resData = await response.json();

  //   if (!response.ok) {
  //     throw new Error(
  //       resData.message || resData.extraDetails || "Registration Failed",
  //     );
  //   }

  //   return resData;
  // };

  const registeration = async (data: FormData) => {
    try {
      const payload = {
        username: data.fullName, // mapping
        email: data.email,
        password: data.password,
        phone: data.phone,
      };

      console.log("Sending Payload:", payload);

      const response = await api.post("/auth/register", payload);

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("RESPONSE 👉", error?.response);
      console.log("DATA 👉", error?.response?.data?.extraDetails);
      throw new Error(
        error?.response?.data?.extraDetails ||
          error?.response?.data?.message ||
          "Registration Failed",
      );
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: registeration,
    onSuccess: (data) => {
      toast.success("Registration Successful");
      storeToken(data.token);
      console.log(data, "Registration Successful");
      navigate({ to: "/" });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.extraDetails || error.message || "Registration Failed");
      console.log(error, "Registration Failed");
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div className="max-w-[600px] mx-auto space-y-4 mt-4 border border-gray-200 p-4 rounded-md max-h-[850px] overflow-y-auto">
      <h1 className="text-2xl font-bold text-primary">Registeration Form</h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-primary">Full Name</label>
          <Input placeholder="Name" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName?.message}</p>
          )}
        </div>
        <div>
          <label className="text-primary">Email</label>
          <Input placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </div>
        <div>
          <label className="text-primary">Password</label>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </div>
        <div>
          <label className="text-primary">Confirm Password</label>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
        </div>

        {/* controller is used where custom input is used like select box ,checkbox etc and in mormal text input use the register */}
        {/* in controller the render is used to display the input and field is used to get the value and register directly used to get the value from the form */}

        <div>
          <Controller
            control={control}
            name="isEmployed" //same as register
            render={({ field }) => {
              return (
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label className="text-primary">Empoyeed</label>
                </div>
              );
            }}
          />

          {isEmployed && (
            <div className="mt-4">
              <label className="text-primary">Designation</label>
              <Input placeholder="Designation" {...register("designation")} />
              {errors.designation && (
                <p className="text-red-500">{errors.designation?.message}</p>
              )}
            </div>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="gender" //same as register
            render={({ field }) => {
              return (
                <div>
                  <label className="text-primary">Select Gender</label>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-red-500">{errors.gender?.message}</p>
                  )}
                </div>
              );
            }}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="profileImage" //same as register
            render={({ field }) => {
              return (
                <div>
                  <label className="text-primary">Upload File</label>
                  <Input
                    type="file"
                    placeholder="Choose File"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    className="cursor-pointer"
                  />
                </div>
              );
            }}
          />
        </div>

        <div>
          <label className="text-primary">Phone Number</label>
          {fields.map((field, index) => (
            <div className="flex gap-2 mb-3" key={field.id}>
              <Input
                {...register(`phone.${index}.number`)}
                //phones.0.number
                // phones.1.number
                // phones.2.number
                placeholder="Phone Number"
              />
              <Button
                type="button"
                variant="destructive"
                className="cursor-pointer"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer"
            onClick={() => append({ number: "" })}
          >
            + Add Phone
          </Button>
        </div>

        <div>
          <Controller
            control={control}
            name="acceptTerms" //same as register
            render={({ field }) => {
              return (
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                  <label className="text-primary">Accept Terms</label>
                </div>
              );
            }}
          />
          {errors.acceptTerms && (
            <p className="text-red-500">{errors.acceptTerms?.message}</p>
          )}
        </div>

        <div>
          <Button
            className="cursor-pointer"
            onSubmit={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
