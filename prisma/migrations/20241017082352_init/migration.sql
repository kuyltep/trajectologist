-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profession_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCompetency" (
    "id" TEXT NOT NULL,
    "competency_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserCompetency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profession" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStep" (
    "id" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "step_id" TEXT NOT NULL,
    "user_competency_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "competency_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_competency-profession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Competency_id_key" ON "Competency"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Competency_name_key" ON "Competency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserCompetency_id_key" ON "UserCompetency"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profession_id_key" ON "Profession"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profession_name_key" ON "Profession"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserStep_id_key" ON "UserStep"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Step_id_key" ON "Step"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_competency-profession_AB_unique" ON "_competency-profession"("A", "B");

-- CreateIndex
CREATE INDEX "_competency-profession_B_index" ON "_competency-profession"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profession_id_fkey" FOREIGN KEY ("profession_id") REFERENCES "Profession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompetency" ADD CONSTRAINT "UserCompetency_competency_id_fkey" FOREIGN KEY ("competency_id") REFERENCES "Competency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompetency" ADD CONSTRAINT "UserCompetency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStep" ADD CONSTRAINT "UserStep_step_id_fkey" FOREIGN KEY ("step_id") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStep" ADD CONSTRAINT "UserStep_user_competency_id_fkey" FOREIGN KEY ("user_competency_id") REFERENCES "UserCompetency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_competency_id_fkey" FOREIGN KEY ("competency_id") REFERENCES "Competency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_competency-profession" ADD CONSTRAINT "_competency-profession_A_fkey" FOREIGN KEY ("A") REFERENCES "Competency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_competency-profession" ADD CONSTRAINT "_competency-profession_B_fkey" FOREIGN KEY ("B") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
