-- Migration: Add role_id column to users table and migrate data

-- Step 1: Check if role_id column already exists, if not add it
ALTER TABLE users ADD (role_id NUMBER);

-- Step 2: Create or ensure roles table has data
-- First, ensure roles exist
BEGIN
  INSERT INTO roles (role_id, role_name) VALUES (1, 'admin');
  INSERT INTO roles (role_id, role_name) VALUES (2, 'staff');
  INSERT INTO roles (role_id, role_name) VALUES (3, 'customer');
  COMMIT;
EXCEPTION WHEN OTHERS THEN
  NULL; -- Roles already exist
END;
/

-- Step 3: Migrate existing data from role column to role_id
-- Map role names to role_ids
UPDATE users u
SET role_id = (
  SELECT role_id FROM roles 
  WHERE LOWER(role_name) = LOWER(COALESCE(u.role, 'customer'))
)
WHERE role_id IS NULL;

-- Step 4: Add NOT NULL constraint if all data is migrated
ALTER TABLE users MODIFY (role_id NOT NULL);

-- Step 5: Add foreign key constraint
ALTER TABLE users ADD CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(role_id);

-- Step 6: Optional - Drop the old role column after verification
-- ALTER TABLE users DROP COLUMN role;

COMMIT;
