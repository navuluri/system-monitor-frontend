import { signIn } from "@/auth";
import {Github, GithubIcon} from "lucide-react";
import { Logo } from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl dark:shadow-zinc-900/30">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <Logo />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-black dark:text-white">
                Welcome back
              </CardTitle>
              <CardDescription className="text-zinc-600 dark:text-zinc-400">
                Sign in to your account to continue
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form
              action={async () => {
                "use server";
                await signIn("github", {
                  redirectTo: "/",
                });
              }}
            >
              <Button
                type="submit"
                className="w-full  bg-primary  text-lg"
                size="lg"
              >
                <Github  className="mr-2 size-8" />
                Login with GitHub
              </Button>
            </form>

            <div className="space-y-4">
              <Separator className="bg-zinc-200 dark:bg-zinc-700" />
              <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
                By signing in, you agree to our terms of service and privacy
                policy
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal">
                Don't have a GitHub account?{" "}
                <a
                  href={
                    process.env.GITHUB_ENTERPRISE_URL
                      ? `${process.env.GITHUB_ENTERPRISE_URL}/join`
                      : "https://github.com/signup"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-black dark:text-white hover:underline"
                >
                  Create one here
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
