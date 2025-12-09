"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Added import

export default function PurchasePage() {
    const [message, setMessage] = useState("");
    const { checkAuth } = useAuthStore();
    const router = useRouter();

    const handlePurchase = async () => {
        try {
            const res = await api.post('/purchase');
            setMessage(res.data.message);
            await checkAuth(); // Update credits
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Purchase failed");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <CardTitle>Purchase Digital Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-5xl">📦</div>
                    <p className="text-gray-600">
                        Simulate a purchase for the "Premium E-Book".
                    </p>
                    <div className="text-2xl font-bold text-green-600">$10.00</div>

                    <Button onClick={handlePurchase} size="lg" className="w-full">
                        Buy Now
                    </Button>

                    {message && (
                        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
                            {message}
                        </div>
                    )}
                    <div className="mt-4">
                        <Link href="/dashboard" className="text-sm text-gray-500 hover:underline">
                            Back to Dashboard
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
