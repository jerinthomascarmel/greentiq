import { NextResponse, NextRequest } from "next/server";
import prisma from "@/packages/prisma/client";
import {
    Sale,
    GetSalesResponse,
    UpdateSaleRequestSchema,
    CreateSaleRequestSchema,
    GetSalesErrorResponse
} from "@/packages/types";



export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    let page: number = Number(searchParams.get('page'))
    let perpage: number = Number(searchParams.get('perpage'))

    const totalCount: number = await prisma.sale.count();


    const sales: Sale[] = await prisma.sale.findMany({
        skip: (page - 1) * perpage,
        take: perpage,
        orderBy: {
            saleDate: 'desc'
        }
    })

    const response: GetSalesResponse = {
        "metadata": {
            page,
            total: totalCount,
            perPage: perpage,
        },
        data: sales
    }

    return NextResponse.json(response);
}


export async function POST(request: NextRequest) {
    const body = await request.json();
    let isRequestValid = CreateSaleRequestSchema.safeParse(body);
    if (!isRequestValid.success) {
        return NextResponse.json(isRequestValid.error, { status: 400 })
    }

    const sale: Sale = await prisma.sale.create({
        data: {
            ...isRequestValid.data,
            saleDate: getFormattedDate(new Date())
        }
    })

    return NextResponse.json(sale);
}

export async function PUT(request: NextRequest) {
    const body = await request.json();
    let isRequestValid = UpdateSaleRequestSchema.safeParse(body);
    if (!isRequestValid.success) {
        return NextResponse.json(isRequestValid.error, { status: 400 })
    }

    const sale: Sale = await prisma.sale.update({
        where: {
            saleId: isRequestValid.data.saleId
        },
        data: {
            ...isRequestValid.data,
            saleDate: String(new Date())
        }
    })
    return NextResponse.json(sale);
}

export async function DELETE(request: NextRequest) {
    const saleId = request.nextUrl.searchParams.get('saleId');
    if (saleId === null) {
        return NextResponse.json({ message: 'saleId is required' }, { status: 400 })
    }

    const sale: Sale = await prisma.sale.delete({
        where: {
            saleId: saleId!
        }
    })
    return NextResponse.json(sale);
}


function getFormattedDate(date: Date) {
    const year = date.getFullYear();
    // getMonth() is 0-indexed, so we add 1
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
}