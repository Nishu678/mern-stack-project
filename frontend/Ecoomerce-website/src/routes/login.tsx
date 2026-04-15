import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "@/components/store/auth";
import { api } from "@/api/AuthApi";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

function RouteComponent() {
  const navigate = useNavigate();
  const { storeToken } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // 🔥 Login API
  // const loginUser = async (data: FormData) => {
  //   const response = await fetch("http://localhost:8000/api/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   const resData = await response.json();

  //   if (!response.ok) {
  //     throw new Error(
  //       resData.extraDetails || resData.message || "Login Failed",
  //     );
  //   }

  //   return resData;
  // };

  const loginUser = async (data: FormData) => {
    try {
      const response = await api.post("/auth/login", data);
      return response.data;
    } catch (error) {
      console.log("RESPONSE 👉", error?.response);
      console.log("DATA 👉", error?.response?.data?.message);
      throw new Error(
        error?.response?.data?.message ||
          error?.response?.data?.extraDetails ||
          "Login Failed",
      );
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      toast.success("Login Successful ✅");
      storeToken(data.token);
      navigate({ to: "/" });
      console.log(data);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-[400px] w-full border p-6 rounded-md space-y-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-primary text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Email</label>
            <Input placeholder="Enter email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Logging..." : "Log In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
