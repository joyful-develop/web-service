import { z } from 'zod';

// 1. 역할 및 상세 권한 정의
export const RoleSchema = z.enum(['Admin', 'Manager', 'User']);
export const PermissionSchema = z.enum(['read:users', 'write:users', 'delete:users']);

// 권한별 가능 업무 구조 정의 (예: 메뉴명, 읽기 권한, 쓰기 권한)
export const TaskPermissionSchema = z.object({
  menuName: z.string({ error: '메뉴명은 필수입니다.' }),
  canRead: z.boolean({ error: '읽기 권한 여부가 필요합니다.' }),
  canWrite: z.boolean({ error: '쓰기 권한 여부가 필요합니다.' }),
});

export type Role = z.infer<typeof RoleSchema>;
export type Permission = z.infer<typeof PermissionSchema>;
export type TaskPermission = z.infer<typeof TaskPermissionSchema>;

// 2. 사용자 관리 정보 스키마 (Zod v4.4 스펙 적용)
export const UserSchema = z.object({
  // [v4.4 변경] z.string().uuid() 대신 탑레벨 독립 함수 z.uuid() 단독 선언
  id: z.uuid(),

  // [v4.4 변경] z.string().email() 대신 z.email() 단독 사용
  // [v4.4 변경] 기존 message/invalid_type_error 등이 단일 인자인 error 속성으로 통합
  email: z.email({ error: '올바른 이메일 형식이 아닙니다.' }),

  // [v4.4 변경] 문자열 길이는 z.string() 선언 후 하위 옵션으로 구성 (error 매개변수 적용)
  name: z.string().min(2, { error: '이름은 최소 2글자 이상이어야 합니다.' }),

  avatarUrl: z.string().url().optional(),

  role: RoleSchema,
  permissions: z.array(PermissionSchema),

  allowedTasks: z.array(TaskPermissionSchema), // 클릭 시 표에 보일 업무 목록

  // [v4.4 변경] 날짜 시간 포맷 역시 탑레벨 iso 객체 또는 전용 포맷 검증 함수 적용
  createdAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;
