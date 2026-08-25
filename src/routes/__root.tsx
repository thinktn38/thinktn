import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteFooter, SiteHeader } from "@/components/tn/site-chrome";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="max-w-lg">
        <p className="u-meta text-primary">404</p>
        <h1 className="u-h1 mt-4">
          That page does not exist.<span className="u-signature"> Nothing was quietly moved.</span>
        </h1>
        <p className="u-body mt-4 text-muted-foreground">
          If a link brought you here from one of our publications, that is an error worth logging.
          Tell us and it goes in the corrections log.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="u-ui inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-background no-underline"
          >
            Go home
          </Link>
          <Link
            to="/evidence/corrections"
            className="u-ui inline-flex min-h-11 items-center rounded-full border border-border px-5 no-underline"
          >
            Corrections log
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="max-w-lg">
        <h1 className="u-h2">This page didn't load.</h1>
        <p className="u-body mt-3 text-muted-foreground">
          Something went wrong on our end. Try again, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="u-ui inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-background"
          >
            Try again
          </button>
          <a
            href="/"
            className="u-ui inline-flex min-h-11 items-center rounded-full border border-border px-5 no-underline"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Think TN Foundation — evidence you can check" },
      {
        name: "description",
        content:
          "An independent Tamil Nadu policy institution. Every figure carries a confidence tag, a date and a source, and every correction is published.",
      },
      { name: "author", content: "Think TN Foundation" },
      { name: "theme-color", content: "#0E1116" },
      { property: "og:site_name", content: "Think TN Foundation" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anek+Latin:wght@300..800&family=Anek+Tamil:wght@300..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main id="main">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
