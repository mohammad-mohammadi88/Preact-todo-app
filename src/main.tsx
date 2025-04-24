import { render } from 'preact'
import "./style.css"
import { StrictMode } from "preact/compat"
import Layout from "./Components/layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
const queryClient = new QueryClient()

render(
<StrictMode>
    <QueryClientProvider client={queryClient}>
        <Layout />
        <ReactQueryDevtools />
    </QueryClientProvider>
</StrictMode>
,document.getElementById('app')!)
