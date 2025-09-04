"use client"

import { useProducts } from "@/src/hooks/useProducts"
import { useCategories } from "@/src/hooks/useCategories"
import { ProductsByCategoryChart } from "@/src/components/charts/ProductsByCategoryChart"
import {
  MoreHorizontal,
  Package,
  Star,
  TrendingUp,
  AlertTriangle,
  Calendar,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"

export default function DashboardPage() {
  const { productsQuery } = useProducts()
  const { categoriesQuery } = useCategories()

  if (productsQuery.isLoading || categoriesQuery.isLoading)
    return <p>Loading...</p>
  if (productsQuery.isError || categoriesQuery.isError)
    return <p>Failed to load data</p>

  const totalProducts = productsQuery.data?.length || 0
  const lowStockCount =
    productsQuery.data?.filter((p) => p.quantity < 50).length || 0

  // Placeholder values
  const avgRating = 4.8
  const salesChange = "+16.8%"

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      change: `from last month`,
      icon: Package,
      color: "text-purple-700",
      bgColor: "bg-purple-100",
    },
    {
      title: "Average Rating",
      value: avgRating,
      change: "+0.2",
      icon: Star,
      color: "text-purple-700",
      bgColor: "bg-purple-100",
    },
    {
      title: "Sales Trends",
      value: "",
      change: salesChange,
      icon: TrendingUp,
      color: "text-purple-700",
      bgColor: "bg-purple-100",
      showChart: true,
    },
    {
      title: "Low Stock",
      value: lowStockCount,
      subvalue: "products",
      change: "under 50 units",
      icon: AlertTriangle,
      color: "text-purple-700",
      bgColor: "bg-purple-100",
    },
  ]

  const recentActivities =
    productsQuery.data?.slice(0, 5).map((product, idx) => ({
      id: idx,
      product: product.name,
      image: "/placeholder-avatar.jpg",
      activity: product.quantity < 50 ? "Low Stock" : "Product Created",
      type: product.quantity < 50 ? "adjustment" : "new",
      details: `Quantity: ${product.quantity}`,
      date: new Date(product.id).toDateString(),
    })) || []

  const getActivityBadge = (type: string) => {
    const variants = {
      adjustment: { variant: "secondary" as const, color: "text-purple-700" },
      new: { variant: "secondary" as const, color: "text-purple-700" },
    }
    return variants[type as keyof typeof variants] || variants.new
  }

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-md bg-white rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                {stat.showChart ? (
                  <div className="h-16 mb-2">
                    <TrendingUp className={`w-full h-full ${stat.color}`} />
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    {stat.subvalue && (
                      <span className="text-sm text-muted-foreground">
                        {stat.subvalue}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs">
                  <Badge
                    variant="secondary"
                    className={`${stat.color} bg-transparent border-0 px-0`}
                  >
                    {stat.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Products By Category Chart */}
      <ProductsByCategoryChart />

      {/* Recent Activities */}
      <Card className="shadow-md bg-white rounded-lg">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="grid grid-cols-12 gap-4 py-3 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <div className="col-span-3">Product</div>
              <div className="col-span-2">Activity Type</div>
              <div className="col-span-4">Details</div>
              <div className="col-span-2">Date</div>
            </div>

            {recentActivities.map((activity) => {
              const badge = getActivityBadge(activity.type)
              return (
                <div
                  key={activity.id}
                  className="grid grid-cols-12 gap-4 py-4 border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <div className="col-span-3 flex items-center gap-3">
                    <Avatar className="w-10 h-10 rounded-lg">
                      <AvatarImage
                        src={activity.image}
                        alt={activity.product}
                      />
                      <AvatarFallback className="rounded-lg bg-muted text-muted-foreground">
                        {activity.product.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">
                      {activity.product}
                    </span>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <Badge
                      variant={badge.variant}
                      className={`${badge.color} bg-transparent border-0`}
                    >
                      {activity.activity}
                    </Badge>
                  </div>

                  <div className="col-span-4 flex items-center">
                    <span className="text-sm text-muted-foreground">
                      {activity.details}
                    </span>
                  </div>

                  <div className="col-span-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {activity.date}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
