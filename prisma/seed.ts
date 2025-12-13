import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // 既存データを削除
  await prisma.todo.deleteMany();

  // サンプルデータを作成
  const todos = await prisma.todo.createMany({
    data: [
      {
        title: "Nuxt 3のディレクトリ構造を理解する",
        description: "pages、components、composablesの使い分けを学ぶ",
        priority: "high",
        completed: false,
      },
      {
        title: "TanStack Vue Queryでデータフェッチを実装",
        description: "useQuery、useMutationの使い方をマスターする",
        priority: "high",
        completed: true,
      },
      {
        title: "Piniaで状態管理",
        description: "グローバルな状態管理の実装パターンを学ぶ",
        priority: "medium",
        completed: false,
      },
      {
        title: "VeeValidateとZodでフォームバリデーション",
        description: "型安全なフォームバリデーションを実装する",
        priority: "medium",
        completed: true,
      },
      {
        title: "Vitestでユニットテストを書く",
        description: "コンポーネントとコンポーザブルのテストを実装する",
        priority: "low",
        completed: false,
      },
      {
        title: "PlaywrightでE2Eテスト",
        description: "実際のユーザーフローをテストする",
        priority: "low",
        completed: false,
      },
      {
        title: "Prismaでデータベース連携",
        description: "SQLiteを使ってCRUD操作を実装する",
        priority: "high",
        completed: false,
      },
      {
        title: "VueUseで便利なコンポーザブルを活用",
        description: "useFetch、useStorage等を使いこなす",
        priority: "medium",
        completed: false,
      },
    ],
  });

  console.log(`Created ${todos.count} todos`);
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
