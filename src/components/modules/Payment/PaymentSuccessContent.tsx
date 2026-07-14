"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { revalidate } from "@/lib/revalidate";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getUserInfo } from "@/services/auth/getUserInfo";
import { confirmPayment } from "@/services/payment/payment.service";

const PaymentSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [countdown, setCountdown] = useState(5);
  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState<"confirming" | "success" | "error">(
    sessionId ? "confirming" : "success"
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Get return URL from session storage only on client
    revalidate("my-appointments");

    const fetchUserRole = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo?.role) {
          setRole(userInfo.role);
        }
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      }
    };
    fetchUserRole();

    const verifyPayment = async () => {
      if (sessionId) {
        try {
          const res = await confirmPayment(sessionId);
          if (res?.success) {
            setStatus("success");
            startCountdown();
          } else {
            setStatus("error");
            setErrorMsg(res?.message || "Failed to confirm payment");
          }
        } catch (err: any) {
          setStatus("error");
          setErrorMsg(err.message || "Failed to confirm payment");
        }
      } else {
        startCountdown();
      }
    };

    let timer: NodeJS.Timeout;
    const startCountdown = () => {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    verifyPayment();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [sessionId]);

  const getRedirectUrl = (userRole: string | null) => {
    const storedUrl = sessionStorage.getItem("paymentReturnUrl");
    if (storedUrl) {
      return storedUrl;
    }
    if (userRole === "ADMIN") {
      return "/admin/dashboard/appointments-management";
    }
    if (userRole === "DOCTOR") {
      return "/doctor/dashboard/appointments";
    }
    return "/dashboard/my-appointments";
  };

  // Redirect after countdown completes
  useEffect(() => {
    if (countdown === 0 && status === "success") {
      const redirectUrl = getRedirectUrl(role);
      sessionStorage.removeItem("paymentReturnUrl");
      router.push(redirectUrl);
    }
  }, [countdown, role, router, status]);

  const handleManualRedirect = () => {
    const redirectUrl = getRedirectUrl(role);
    sessionStorage.removeItem("paymentReturnUrl");
    router.push(redirectUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-green-50 to-emerald-50">
      <Card className={`max-w-md w-full shadow-lg ${
        status === "confirming"
          ? "border-blue-200"
          : status === "error"
          ? "border-red-200"
          : "border-green-200"
      }`}>
        <CardContent className="pt-8 pb-6">
          <div className="text-center space-y-6">
            {status === "confirming" && (
              <>
                <div className="flex justify-center">
                  <div className="relative bg-blue-100 rounded-full p-4">
                    <Loader2 className="h-20 w-20 text-blue-600 animate-spin" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-blue-900">
                    Confirming Payment...
                  </h1>
                  <p className="text-blue-700">
                    Please wait while we verify your transaction status with Stripe.
                  </p>
                </div>
              </>
            )}

            {status === "error" && (
              <>
                <div className="flex justify-center">
                  <div className="relative bg-red-100 rounded-full p-4">
                    <XCircle className="h-20 w-20 text-red-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-red-900">
                    Confirmation Failed
                  </h1>
                  <p className="text-red-700">
                    {errorMsg || "We couldn't confirm your payment status."}
                  </p>
                </div>
                <Button
                  onClick={handleManualRedirect}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  Go to Appointments
                </Button>
              </>
            )}

            {status === "success" && (
              <>
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-green-100 rounded-full p-4">
                      <CheckCircle2 className="h-20 w-20 text-green-600" />
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-green-900">
                    Payment Successful!
                  </h1>
                  <p className="text-green-700">
                    Your appointment has been confirmed and payment received.
                  </p>
                </div>

                {/* Details */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-green-800">
                    A confirmation email has been sent to your registered email
                    address with appointment details.
                  </p>
                </div>

                {/* Countdown */}
                <div className="text-sm text-green-600">
                  Redirecting to your appointments in {countdown} seconds...
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleManualRedirect}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  View My Appointments
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessContent;