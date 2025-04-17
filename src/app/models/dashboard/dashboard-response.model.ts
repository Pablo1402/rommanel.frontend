export interface DashboardResponseModel {
    totalProducts: number;
    totalPartners: number;
    totalBudgets: number;
    totalOrders: number;
    budgets: DashboardBudgetsModel[] | null;
}

export interface DashboardBudgetsModel {
    id: number;
    name: string;
    beginDate: string;
    endDate: string;
    status: string;
    itens: number;
    partners: number;
}


