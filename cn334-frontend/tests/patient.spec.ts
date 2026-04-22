import { test, expect } from '@playwright/test';

test('ทดสอบระบบค้นหาคนไข้บนตาราง (ด้วย API Mocking)', async ({ page }) => {

  // 1. ดักจับ API และส่งข้อมูลปลอมกลับ
  await page.route('http://localhost:3340/patients', async route => {
    const mockData = [
      {
        id: 1,
        hn_number: 'HN999',
        patient_name: 'Robot Tester',
        exam_date: '2026-03-31',
        diagnosis: 'Testing'
      },
      {
        id: 2,
        hn_number: 'HN111',
        patient_name: 'John Doe',
        exam_date: '2026-04-01',
        diagnosis: 'Fever'
      }
    ];

    await route.fulfill({ json: mockData });
  });

  // 2. เปิดหน้า patients
  await page.goto('http://localhost:3000/admin/patients');

  // 3. ตรวจว่าข้อมูลโหลดมาแล้ว
  await expect(page.locator('table')).toContainText('Robot Tester');

  // 4. พิมพ์ค้นหา John
  const searchInput = page.getByPlaceholder('ค้นหาชื่อ หรือ HN...');
  await searchInput.fill('John');

  // 5. ตรวจผลลัพธ์
  await expect(page.locator('table')).toContainText('John Doe');
  await expect(page.locator('table')).not.toContainText('Robot Tester');

});