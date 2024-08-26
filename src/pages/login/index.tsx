import Layout from "components/Layouts/Layout";
import Section from "components/Section";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { toast } from "sonner";
import bcrypt from "bcryptjs";
import { useRouter } from "next/router";
import { useAuth } from "context/authContext";
import { useEffect } from "react";
import { bunnyLog } from "bunny-log";

type FormData = {
	identifier: string;
	password: string;
};

const formSchema = z.object({
	identifier: z.string().min(1, "Identifier is required."),
	password: z.string().min(1, "Password is required."),
});

const LoginPage = () => {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});
	const router = useRouter();
	const { login } = useAuth();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			// Fetch the credentials document from Firestore
			const docRef = doc(db, "admin", "credentials");
			const userDoc = await getDoc(docRef);

			if (!userDoc.exists()) {
				throw new Error("Invalid identifier or password");
			}

			const { identifier, passwordHash } = userDoc.data() as {
				identifier: string;
				passwordHash: string;
			};

			// Compare both the identifier and password together
			const isIdentifierMatch = data.identifier.trim() === identifier;
			const isPasswordMatch = await bcrypt.compare(data.password, passwordHash);

			if (isIdentifierMatch && isPasswordMatch) {
				const user = await login(data.identifier, data.password);
				if (user) {
					toast.success("Login successful!");
					router.push("/anons");
				} else {
					throw new Error("User login failed");
				}
			} else {
				throw new Error("Invalid identifier or password");
			}
		} catch (error: any) {
			// Improved logging
			bunnyLog.error("Login error", { error, identifier: data.identifier });
			toast.error("Invalid identifier or password");
		}
	};

	return (
		<Layout>
			<Section className="max-w-lg mx-auto">
				<h2 className="mb-8 text-3xl font-semibold text-center">Login</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="identifier"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Identifier</FormLabel>
									<FormControl>
										<Input placeholder="Enter your identifier" {...field} />
									</FormControl>
									<FormDescription>
										This is your unique identifier.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Login
						</Button>
					</form>
				</Form>
			</Section>
		</Layout>
	);
};

export default LoginPage;
