// "use client";
// import { useContext, useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { authApi, transactionApi } from "@/api/api";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   CartesianGrid,
// } from "recharts";
// import { format } from "date-fns";
// import { AuthContext } from "@/context/AuthContext";
// import { Transaction } from "@/types/types";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import React from "react";

// export default function DashboardPage() {
//   const { currentUser } = useContext(AuthContext);
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [balance, setBalance] = useState<number>(0);

//   // Для нової транзакції
//   const [amount, setAmount] = useState("");
//   const [type, setType] = useState<"income" | "expense">("income");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!currentUser) return;
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const data = await transactionApi.getAll(token);
//         setTransactions(data);

//         const total = data.reduce(
//           (acc: number, tx: Transaction) =>
//             tx.type === "income" ? acc + tx.amount : acc - tx.amount,
//           0
//         );
//         setBalance(total);
//       } catch (e) {
//         console.error("❌ Error loading dashboard:", e);
//       }
//     };
//     if (currentUser) {
//       fetchData();
//     }
//   }, [currentUser]);

//   const handleAddTransaction = async () => {
//     console.log("🔵 handleAddTransaction called");
//     try {
//       const token = localStorage.getItem("token");
//       if (!token || !amount) return;

//       const newTransaction = {
//         amount: parseFloat(amount),
//         type,
//         categoryId: "dummy-category", // заміни на реальний або додай вибір
//         note: "Додано вручну",
//         date: new Date().toISOString(),
//       };

//       await transactionApi.create(newTransaction, token);
//       setAmount("");
//       setType("income");

//       // reload
//       const updated = await transactionApi.getAll(token);
//       setTransactions(updated);
//       const updatedBalance = updated.reduce(
//         (acc: number, tx: Transaction) =>
//           tx.type === "income" ? acc + tx.amount : acc - tx.amount,
//         0
//       );
//       setBalance(updatedBalance);
//     } catch (e) {
//       console.error("❌ Failed to add transaction", e);
//     }
//   };
//   const chartConfig = {
//     visitors: {
//       label: "Visitors",
//     },
//     desktop: {
//       label: "Desktop",
//       color: "hsl(var(--chart-1))",
//     },
//     mobile: {
//       label: "Mobile",
//       color: "hsl(var(--chart-2))",
//     },
//   } satisfies ChartConfig;
//   // const chartData = [
//   //   {
//   //     name: "Income",
//   //     total: transactions
//   //       .filter((t) => t.type === "income")
//   //       .reduce((acc, t) => acc + t.amount, 0),
//   //   },
//   //   {
//   //     name: "Expense",
//   //     total: transactions
//   //       .filter((t) => t.type === "expense")
//   //       .reduce((acc, t) => acc + t.amount, 0),
//   //   },
//   // ];
//   const groupedChartData = transactions.reduce((acc: any, tx) => {
//     const date = format(new Date(tx.date), "yyyy-MM-dd");

//     if (!acc[date]) {
//       acc[date] = { date, income: 0, expense: 0 };
//     }

//     if (tx.type === "income") {
//       acc[date].income += tx.amount;
//     } else if (tx.type === "expense") {
//       acc[date].expense += tx.amount;
//     }

//     return acc;
//   }, {});

//   const chartData = Object.values(groupedChartData).sort(
//     (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
//   );
//   const [timeRange, setTimeRange] = React.useState("90d");

//   const filteredData = chartData.filter((item) => {
//     const date = new Date(item.date);
//     const referenceDate = new Date("2024-06-30");
//     let daysToSubtract = 90;
//     if (timeRange === "30d") {
//       daysToSubtract = 30;
//     } else if (timeRange === "7d") {
//       daysToSubtract = 7;
//     }
//     const startDate = new Date(referenceDate);
//     startDate.setDate(startDate.getDate() - daysToSubtract);
//     return date >= startDate;
//   });

//   return (
//     <div className="space-y-6 p-6 text_change">
//       <h1 className="text-4xl font-bold">Dashboard</h1>

//       {/* Баланс */}
//       <Card>
//         <CardContent className="text-2xl p-4">
//           Поточний баланс:{" "}
//           <span className={balance >= 0 ? "text-green-500" : "text-red-500"}>
//             {balance} ₴
//           </span>
//         </CardContent>
//       </Card>

//       {/* ➕ Додати транзакцію */}
//       {/* <Card>
//         <CardContent className="p-4 space-y-4">
//           <h2 className="text-xl font-semibold">Додати транзакцію</h2>
//           <div className="flex gap-2">
//             <Input
//               type="number"
//               placeholder="Сума"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//             <select
//               className="border rounded px-2"
//               value={type}
//               onChange={(e) => setType(e.target.value as "income" | "expense")}
//             >
//               <option value="income">Доходи</option>
//               <option value="expense">Витрати</option>
//             </select>
//             <Button className="cursor-pointer" onClick={handleAddTransaction}>
//               Додати
//             </Button>
//           </div>
//         </CardContent>
//       </Card> */}

//       {/* Останні транзакції */}
//       {/* <Card>
//         <CardContent className="p-4">
//           <h2 className="text-xl font-semibold mb-2">Останні транзакції</h2>
//           <ul className="space-y-2">
//             {transactions.slice(0, 5).map((tx) => (
//               <li key={tx.id} className="flex justify-between border-b py-1">
//                 <span
//                   className={
//                     tx.type === "income" ? "text-green-600" : "text-red-600"
//                   }
//                 >
//                   {tx.amount} ₴
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card> */}

//       {/* Графік */}
//       {/* <Card>
//         <CardContent className="p-4">
//           <h2 className="text-xl font-semibold mb-2">Графік доходів/витрат</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="total" fill="#4f46e5" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card> */}
//       {/* Графік доходів/витрат */}
//       <Card>
//         <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
//           <div className="grid flex-1 gap-1 text-center sm:text-left">
//             <CardTitle>Area Chart - Interactive</CardTitle>
//             <CardDescription>
//               Showing total visitors for the last 3 months
//             </CardDescription>
//           </div>
//           <Select value={timeRange} onValueChange={setTimeRange}>
//             <SelectTrigger
//               className="w-[160px] rounded-lg sm:ml-auto"
//               aria-label="Select a value"
//             >
//               <SelectValue placeholder="Last 3 months" />
//             </SelectTrigger>
//             <SelectContent className="rounded-xl">
//               <SelectItem value="90d" className="rounded-lg">
//                 Last 3 months
//               </SelectItem>
//               <SelectItem value="30d" className="rounded-lg">
//                 Last 30 days
//               </SelectItem>
//               <SelectItem value="7d" className="rounded-lg">
//                 Last 7 days
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </CardHeader>
//         <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
//           <ChartContainer
//             config={chartConfig}
//             className="aspect-auto h-[250px] w-full"
//           >
//             <AreaChart data={filteredData}>
//               <defs>
//                 <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
//                   <stop
//                     offset="5%"
//                     stopColor="var(--color-desktop)"
//                     stopOpacity={0.8}
//                   />
//                   <stop
//                     offset="95%"
//                     stopColor="var(--color-desktop)"
//                     stopOpacity={0.1}
//                   />
//                 </linearGradient>
//                 <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
//                   <stop
//                     offset="5%"
//                     stopColor="var(--color-mobile)"
//                     stopOpacity={0.8}
//                   />
//                   <stop
//                     offset="95%"
//                     stopColor="var(--color-mobile)"
//                     stopOpacity={0.1}
//                   />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid vertical={false} />
//               <XAxis
//                 dataKey="date"
//                 tickLine={false}
//                 axisLine={false}
//                 tickMargin={8}
//                 minTickGap={32}
//                 tickFormatter={(value) => {
//                   const date = new Date(value);
//                   return date.toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                   });
//                 }}
//               />
//               <ChartTooltip
//                 cursor={false}
//                 content={
//                   <ChartTooltipContent
//                     labelFormatter={(value) => {
//                       return new Date(value).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                       });
//                     }}
//                     indicator="dot"
//                   />
//                 }
//               />
//               <Area
//                 dataKey="income"
//                 type="natural"
//                 fill="url(#fillMobile)"
//                 stroke="var(--color-mobile)"
//                 stackId="a"
//               />
//               <Area
//                 dataKey="expense"
//                 type="natural"
//                 fill="url(#fillDesktop)"
//                 stroke="var(--color-desktop)"
//                 stackId="a"
//               />
//               <ChartLegend content={<ChartLegendContent />} />
//             </AreaChart>
//           </ChartContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const generateDummyTransactions = () => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toISOString().split("T")[0],
      income: Math.floor(Math.random() * 200),
      expense: Math.floor(Math.random() * 150),
    });
  }
  return data;
};

export default function BudgetlyDemoPage() {
  const [chartData] = useState(generateDummyTransactions());
  const [timeRange, setTimeRange] = useState("30d");

  const filteredData = chartData.slice(-30);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-4xl font-bold">Budgetly Dashboard - Demo</h1>

      {/* 1. Wprowadzanie przychodów i wydatków */}
      <Card>
        <CardHeader>
          <CardTitle>Wprowadzanie transakcji</CardTitle>
          <CardDescription>
            Dodawaj dochody i wydatki ręcznie lub przez import plików/paragonów
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Kwota"
              className="border rounded px-2 py-1 w-32"
            />
            <select className="border rounded px-2 py-1">
              <option>Dochód</option>
              <option>Wydatek</option>
            </select>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">
              Dodaj
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 2. Kategorie wydatków */}
      <Card>
        <CardHeader>
          <CardTitle>Kategorie wydatków</CardTitle>
          <CardDescription>
            Przykładowe kategorie: jedzenie, transport, mieszkanie, rozrywka
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            {["Jedzenie", "Transport", "Mieszkanie", "Rozrywka", "Inne"].map(
              (cat) => (
                <span key={cat} className="px-3 py-1 bg-gray-200 rounded">
                  {cat}
                </span>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* 3. Budżet miesięczny i cele oszczędności */}
      <Card>
        <CardHeader>
          <CardTitle>Budżet i cele oszczędnościowe</CardTitle>
          <CardDescription>
            Ustal limity wydatków i cele oszczędzania
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Miesięczny budżet: 3000 ₴</p>
          <p>Cel oszczędnościowy: Wakacje 2025 - 2000 ₴</p>
        </CardContent>
      </Card>

      {/* 4. Wykresy i raporty */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>Wydatki vs Dochody</CardTitle>
            <CardDescription>
              Przegląd wydatków i przychodów w wybranym okresie
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Zakres czasu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Ostatnie 7 dni</SelectItem>
              <SelectItem value="30d">Ostatnie 30 dni</SelectItem>
              <SelectItem value="90d">Ostatnie 90 dni</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34D399" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#34D399" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F87171" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F87171" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <CartesianGrid vertical={false} />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#10B981"
                fill="url(#incomeFill)"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#EF4444"
                fill="url(#expenseFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 5. Powiadomienia o przekroczeniu budżetu */}
      <Card>
        <CardHeader>
          <CardTitle>Alerty i powiadomienia</CardTitle>
          <CardDescription>
            System ostrzega o zbliżającym się lub przekroczonym budżecie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">
            ⚠️ Uwaga! Przekroczenie budżetu na jedzenie!
          </p>
        </CardContent>
      </Card>

      {/* 6. Dodatkowe funkcje */}
      <Card>
        <CardHeader>
          <CardTitle>Dodatkowe funkcje</CardTitle>
          <CardDescription>
            Skanowanie paragonów, porady oszczędnościowe, wspólny budżet dla
            rodziny
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li>Skanowanie paragonów (OCR)</li>
            <li>Mini-porady oszczędnościowe</li>
            <li>Wspólny budżet rodzinny</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
