import { ActionFunctionArgs, redirect } from "@remix-run/node";

import { destroySession, getSession } from "../session.server";

export async function action({ request }: ActionFunctionArgs) {}
