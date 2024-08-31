# Next Caching

- Data Cache, Responses from requests made with "fetch" are stored and use across requests.
- Router Cahe, "soft" navigation between routes are cached in browser and reused when a user revisits a page.
- request memoization, make two or more "GET" requests with "fetch" during a user's request to your server, only one
  "GET" is actually executed.
- Full Route Cachem At Build time, next decides if your route is static or dynami. if it is static, the page is
  rendered and the result is stored. In production, users are given this pre-rendered result.

## What makes a page dynamic ?

- calling a "dynamic function" or refercing a "dynamic variable" when your route renders
  - cookies.set()
  - cookies.delete()
  - useSearchParams()
  - searchParams prop
- Assigning specific "route segment config" options
  - export const dynamic = "force-dynamic" or
  - export const revalidate = 0
- Calling "fetch" and opting out of cachig of the response
  - fetch("...", { next:{ revalidate:0 }});
- using a dynamic route
  - /snippets/__[id]__/pages.tsx
  - /snippets/__[id]__/edit/pages.tsx

### Ways of control caching (solutions to page is rendering with out-of-date data)

- __Time Based__, Every X seconds, ignored the cached response and fetch new data.
  - ```typescript
    export const revalidate = 3; // seconds
    export default async function Page(){
    const user = await db.users.findMany();
    ...
    }
    ```

    - Use case, a socail media website, data is changing all the time - only get top posts every 10-30 seconds.
- __On-Demand__, Forcibly purge a chached response.
  - ```typescript
    import { revalidatePath } from "next/caehe";
    // When we think the data that "/users" route has changed...
    // such as you added a new user to database by submiting a form.
    revalidatePath("/users")
    ```

    Any app where we know __when__ data changes __and__ the user expects to see up-to-date data
- __Disable Caching__, Don't do anything at all.
  - ```typescript
    export const revalidate = 0; 
    // or export const dynamic = "force-dynamic"
    export default async function Page(){
    ...
    }
    ```

    App where we don't know when data changes or when we expect the data to be different with every request amd user still expects to see up to date data. for example a next server that intergrate a weather api based on user location.

### Generate Static Page for dynamic routes with __generateStaticParams__

when a route is dynamic, the page will be generately dynamiclly, how ever you still can use __generateStaticParams__ to pre generate some static pages. This is useful when some data is popular and requested very often.
