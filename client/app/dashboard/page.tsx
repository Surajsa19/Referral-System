"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardPage() {
    const { user, checkAuth } = useAuthStore();
    const [stats, setStats] = useState({
        totalReferrals: 0,
        convertedReferrals: 0,
        totalCredits: 0,
        referrals: []
    });

    const fetchStats = async () => {
        try {
            const res = await api.get('/referrals/stats');
            setStats(res.data);
            checkAuth(); // Update credits in store
        } catch (error) {
            console.error("Failed to fetch stats", error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const referralLink = typeof window !== 'undefined'
        ? `${window.location.origin}/register?r=${user?.referralCode}`
        : '';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        alert("Referral link copied!");
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Referrals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-slate-900">{stats.totalReferrals}</div>
                        <p className="text-xs text-muted-foreground mt-1">Friends who signed up</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Converted Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-slate-900">{stats.convertedReferrals}</div>
                        <p className="text-xs text-muted-foreground mt-1">Friends who purchased</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-100">Total Credits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{stats.totalCredits}</div>
                        <p className="text-xs text-blue-200 mt-1">Available to spend</p>
                    </CardContent>
                </Card>
            </div>

            {/* Referral Link */}
            <Card className="shadow-sm border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg">Your Unique Referral Link</CardTitle>
                    <p className="text-sm text-gray-500">Share this link to earn 2 credits for every friend who buys!</p>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-3">
                        <Input value={referralLink} readOnly className="bg-slate-50 border-slate-200 font-mono text-slate-600" />
                        <Button onClick={copyToClipboard} className="shrink-0 gap-2 bg-slate-900 hover:bg-slate-800 text-white">
                            <Copy size={16} /> Copy Link
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
