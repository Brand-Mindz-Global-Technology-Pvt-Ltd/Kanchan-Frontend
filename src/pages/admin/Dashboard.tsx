import AdminStatCard from "../../components/admin/AdminStatCard";
import { mockProducts, mockCategories, mockOrders, mockCustomers } from "../../data";

function Dashboard({ products }: { products?: any[] }) {
  const productsList = products || mockProducts;
  const stats = {
    totalProducts: productsList.length,
    totalCategories: mockCategories.length,
    totalOrders: mockOrders.length,
    totalCustomers: mockCustomers.length,
    revenue: mockOrders
      .filter((order) => order.paymentStatus === "paid")
      .reduce((sum, order) => sum + order.totalAmount, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-[#E8F5E9] text-[#1A7D4E]";
      case "processing":
        return "bg-[#E3F2FD] text-[#1565C0]";
      case "shipped":
        return "bg-[#FFF3E0] text-[#E65100]";
      case "pending":
        return "bg-[#FFF8E1] text-[#F57C00]";
      case "cancelled":
        return "bg-[#FFEBEE] text-[#C62828]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Four Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AdminStatCard
          title="Total Revenue"
          value={`₹${stats.revenue.toLocaleString()}`}
          icon="💰"
          trend="+18%"
          trendUp={true}
          color="#06452E"
        />
        <AdminStatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="📦"
          trend="+12%"
          trendUp={true}
          color="#0B6640"
        />
        <AdminStatCard
          title="Total Products"
          value={stats.totalProducts}
          icon="🌿"
          trend="+8%"
          trendUp={true}
          color="#106850"
        />
        <AdminStatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon="👥"
          trend="+15%"
          trendUp={true}
          color="#157A60"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="rounded-[22px] border border-[#E6EADF] bg-white p-6 shadow-[0_4px_20px_rgba(20,56,38,0.06)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#06452E]">Recent Orders</h3>
            <button className="text-sm font-medium text-[#06452E] hover:text-[#0B6640] transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left pb-4 text-xs font-semibold text-[#06452E] uppercase tracking-wider">Order ID</th>
                  <th className="text-left pb-4 text-xs font-semibold text-[#06452E] uppercase tracking-wider">Customer</th>
                  <th className="text-left pb-4 text-xs font-semibold text-[#06452E] uppercase tracking-wider">Date</th>
                  <th className="text-left pb-4 text-xs font-semibold text-[#06452E] uppercase tracking-wider">Total</th>
                  <th className="text-left pb-4 text-xs font-semibold text-[#06452E] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-[#F8F9F7] transition-colors">
                    <td className="py-4 text-sm font-medium text-[#06452E]">{order.orderNumber}</td>
                    <td className="py-4 text-sm text-[#5A6C60]">{order.customerName}</td>
                    <td className="py-4 text-sm text-[#5A6C60]">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="py-4 text-sm font-semibold text-[#06452E]">₹{order.totalAmount.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best-Selling Products */}
        <div className="rounded-[22px] border border-[#E6EADF] bg-white p-6 shadow-[0_4px_20px_rgba(20,56,38,0.06)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#06452E]">Best-Selling Products</h3>
            <button className="text-sm font-medium text-[#06452E] hover:text-[#0B6640] transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {productsList.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center gap-4 p-4 bg-[#F8F9F7] rounded-xl hover:bg-[#F0F2EE] transition-colors">
                <div className="w-10 h-10 bg-[#06452E] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#06452E] truncate">{product.name}</p>
                  <p className="text-xs text-[#7A8C80]">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#06452E]">{product.price}</p>
                  <p className="text-xs text-[#7A8C80]">{product.stock} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
