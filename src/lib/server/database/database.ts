type User = {
    name: string,
    phone: string,
}

type Issue = {
    id: number,
    description: string,
    orderNumber: string,
    user: User,
}

let issues: Issue[] = [];


export function postIssue (name: string, phone: string, description:string, orderNumber?: string) {
    const user: User = {
        name,
        phone
    }
    const issue: Issue = {
        id: Date.now(),
        description,
        orderNumber: orderNumber ?? "0",
        user,
    }

    issues.push(issue);
}