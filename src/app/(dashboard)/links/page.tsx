import { LinksTable } from "@/components/links-table/links-table";

export default function LinksPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Link Management</h2>
          <p className="text-muted-foreground">
            Manage all your shortened links in one place.
          </p>
        </div>
      </div>
      <LinksTable />
    </div>
  )
}
