/*
  # Add plan-related columns to customers table

  1. Schema Changes
    - Add `plan_id` (text) - identifier for the selected plan
    - Add `plan_name` (text) - name of the selected plan  
    - Add `plan_price` (numeric) - price of the selected plan
    - Add `plan_images` (integer) - number of images in the plan

  2. Notes
    - These columns are needed for the application to store plan information with customer orders
    - All columns are nullable to maintain compatibility with existing records
*/

-- Add plan-related columns to customers table
DO $$
BEGIN
  -- Add plan_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'plan_id'
  ) THEN
    ALTER TABLE customers ADD COLUMN plan_id text;
  END IF;

  -- Add plan_name column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'plan_name'
  ) THEN
    ALTER TABLE customers ADD COLUMN plan_name text;
  END IF;

  -- Add plan_price column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'plan_price'
  ) THEN
    ALTER TABLE customers ADD COLUMN plan_price numeric;
  END IF;

  -- Add plan_images column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'plan_images'
  ) THEN
    ALTER TABLE customers ADD COLUMN plan_images integer;
  END IF;
END $$;