"use client";

import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type TodoType = {
  title: string;
  isDone: boolean;
  id: string;
};
const HomePage = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Button onClick={() => router.push("/sample")} className="cursor-pointer">
        Click on me to go Sample Page
      </Button>
    </div>
  );
};
export default HomePage;
