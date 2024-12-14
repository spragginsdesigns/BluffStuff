import { useState } from "react";
import { motion } from "framer-motion";

type TaskStatus = "pending" | "in-progress" | "completed";
type BudgetStatus = "planned" | "approved" | "purchased";
type SupplyStatus = "needed" | "acquired";

interface Task {
	id: string;
	title: string;
	assignee: string;
	status: TaskStatus;
	dueDate: string;
}

interface Budget {
	id: string;
	item: string;
	amount: number;
	category: string;
	status: BudgetStatus;
}

interface Supply {
	id: string;
	item: string;
	quantity: number;
	responsible: string;
	status: SupplyStatus;
}

type StatusColors = {
	[K in TaskStatus | BudgetStatus | SupplyStatus]: string;
};

export default function EventPlanner() {
	const [activeTab, setActiveTab] = useState<"tasks" | "budget" | "supplies">(
		"tasks"
	);
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: "1",
			title: "Book venue",
			assignee: "Sarah",
			status: "completed",
			dueDate: "2024-01-15"
		},
		{
			id: "2",
			title: "Order decorations",
			assignee: "Mike",
			status: "in-progress",
			dueDate: "2024-01-20"
		}
	]);

	const [budget, setBudget] = useState<Budget[]>([
		{
			id: "1",
			item: "Decorations",
			amount: 150.0,
			category: "Supplies",
			status: "approved"
		},
		{
			id: "2",
			item: "Food & Beverages",
			amount: 300.0,
			category: "Catering",
			status: "planned"
		}
	]);

	const [supplies, setSupplies] = useState<Supply[]>([
		{
			id: "1",
			item: "Tables",
			quantity: 10,
			responsible: "John",
			status: "needed"
		},
		{
			id: "2",
			item: "Chairs",
			quantity: 50,
			responsible: "Lisa",
			status: "acquired"
		}
	]);

	const statusColors: StatusColors = {
		completed: "bg-green-500/20 text-green-400 border-green-500",
		"in-progress": "bg-blue-500/20 text-blue-400 border-blue-500",
		pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
		approved: "bg-green-500/20 text-green-400 border-green-500",
		planned: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
		purchased: "bg-blue-500/20 text-blue-400 border-blue-500",
		needed: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
		acquired: "bg-green-500/20 text-green-400 border-green-500"
	};

	const getStatusColor = (
		status: TaskStatus | BudgetStatus | SupplyStatus
	): string => {
		return statusColors[status];
	};

	const handleStatusChange = (
		id: string,
		newStatus: TaskStatus | BudgetStatus | SupplyStatus
	) => {
		if (activeTab === "tasks") {
			setTasks(
				tasks.map((task) =>
					task.id === id ? { ...task, status: newStatus as TaskStatus } : task
				)
			);
		} else if (activeTab === "budget") {
			setBudget(
				budget.map((item) =>
					item.id === id ? { ...item, status: newStatus as BudgetStatus } : item
				)
			);
		} else {
			setSupplies(
				supplies.map((supply) =>
					supply.id === id
						? { ...supply, status: newStatus as SupplyStatus }
						: supply
				)
			);
		}
	};

	const getNextStatus = (
		currentStatus: TaskStatus | BudgetStatus | SupplyStatus
	): TaskStatus | BudgetStatus | SupplyStatus => {
		const taskStatuses: TaskStatus[] = ["pending", "in-progress", "completed"];
		const budgetStatuses: BudgetStatus[] = ["planned", "approved", "purchased"];
		const supplyStatuses: SupplyStatus[] = ["needed", "acquired"];

		if (activeTab === "tasks") {
			const currentIndex = taskStatuses.indexOf(currentStatus as TaskStatus);
			return taskStatuses[(currentIndex + 1) % taskStatuses.length];
		} else if (activeTab === "budget") {
			const currentIndex = budgetStatuses.indexOf(
				currentStatus as BudgetStatus
			);
			return budgetStatuses[(currentIndex + 1) % budgetStatuses.length];
		} else {
			const currentIndex = supplyStatuses.indexOf(
				currentStatus as SupplyStatus
			);
			return supplyStatuses[(currentIndex + 1) % supplyStatuses.length];
		}
	};

	return (
		<section className="py-16">
			<div className="container mx-auto px-4 max-w-6xl">
				<h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
					Event Planning Dashboard
				</h2>

				<div className="flex justify-center mb-8 space-x-4">
					{[
						{ id: "tasks", label: "Tasks" },
						{ id: "budget", label: "Budget" },
						{ id: "supplies", label: "Supplies" }
					].map(({ id, label }) => (
						<motion.button
							key={id}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() =>
								setActiveTab(id as "tasks" | "budget" | "supplies")
							}
							className={`px-8 py-3 rounded-full font-medium transition-all duration-200
                ${
									activeTab === id
										? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
										: "bg-gray-800 text-gray-400 hover:bg-gray-700"
								}`}
						>
							{label}
						</motion.button>
					))}
				</div>

				<div className="bg-gray-900/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
					{activeTab === "tasks" && (
						<div className="space-y-4">
							<div className="flex justify-between items-center mb-6">
								<h3 className="text-xl font-semibold text-white">Task List</h3>
								<button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-600 hover:to-pink-700 transition-colors">
									Add Task
								</button>
							</div>
							{tasks.map((task) => (
								<div
									key={task.id}
									className="flex items-center justify-between p-4 bg-gray-900/5 rounded-lg border border-gray-700"
								>
									<div>
										<h4 className="text-white font-medium mb-1">
											{task.title}
										</h4>
										<p className="text-gray-400 text-sm">
											Assigned to: {task.assignee}
										</p>
									</div>
									<div className="flex items-center space-x-4">
										<button
											onClick={() =>
												handleStatusChange(task.id, getNextStatus(task.status))
											}
											className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(
												task.status
											)}`}
										>
											{task.status}
										</button>
										<span className="text-gray-400 text-sm">
											Due: {new Date(task.dueDate).toLocaleDateString()}
										</span>
									</div>
								</div>
							))}
						</div>
					)}

					{activeTab === "budget" && (
						<div className="space-y-4">
							<div className="flex justify-between items-center mb-6">
								<div>
									<h3 className="text-xl font-semibold text-white mb-2">
										Budget Tracker
									</h3>
									<p className="text-gray-400">
										Total: $
										{budget
											.reduce((sum, item) => sum + item.amount, 0)
											.toFixed(2)}
									</p>
								</div>
								<button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-600 hover:to-pink-700 transition-colors">
									Add Item
								</button>
							</div>
							{budget.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
								>
									<div>
										<h4 className="text-white font-medium mb-1">{item.item}</h4>
										<p className="text-gray-400 text-sm">
											Category: {item.category}
										</p>
									</div>
									<div className="flex items-center space-x-4">
										<span className="text-white font-medium">
											${item.amount.toFixed(2)}
										</span>
										<button
											onClick={() =>
												handleStatusChange(item.id, getNextStatus(item.status))
											}
											className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(
												item.status
											)}`}
										>
											{item.status}
										</button>
									</div>
								</div>
							))}
						</div>
					)}

					{activeTab === "supplies" && (
						<div className="space-y-4">
							<div className="flex justify-between items-center mb-6">
								<h3 className="text-xl font-semibold text-white">
									Supplies Checklist
								</h3>
								<button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-600 hover:to-pink-700 transition-colors">
									Add Supply
								</button>
							</div>
							{supplies.map((supply) => (
								<div
									key={supply.id}
									className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
								>
									<div>
										<h4 className="text-white font-medium mb-1">
											{supply.item}
										</h4>
										<p className="text-gray-400 text-sm">
											Responsible: {supply.responsible}
										</p>
									</div>
									<div className="flex items-center space-x-4">
										<span className="text-white">Qty: {supply.quantity}</span>
										<button
											onClick={() =>
												handleStatusChange(
													supply.id,
													getNextStatus(supply.status)
												)
											}
											className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(
												supply.status
											)}`}
										>
											{supply.status}
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
