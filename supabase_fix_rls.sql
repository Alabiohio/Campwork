-- Comprehensive Fix for Message Read Receipts and Visibility

-- 1. Allow UPDATING messages (Mark as Read)
-- This is critical for clearing the badge
DROP POLICY IF EXISTS "Users can update messages in their conversations" ON messages;
CREATE POLICY "Users can update messages in their conversations"
ON messages FOR UPDATE
USING (
  auth.uid() IN (
    SELECT participant_1 FROM conversations WHERE id = conversation_id
    UNION
    SELECT participant_2 FROM conversations WHERE id = conversation_id
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT participant_1 FROM conversations WHERE id = conversation_id
    UNION
    SELECT participant_2 FROM conversations WHERE id = conversation_id
  )
);

-- 2. Allow SELECTING messages (Count Unread)
-- This is critical for PERSISTING the badge count (prevents wiping)
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON messages;
CREATE POLICY "Users can view messages in their conversations"
ON messages FOR SELECT
USING (
  auth.uid() IN (
    SELECT participant_1 FROM conversations WHERE id = conversation_id
    UNION
    SELECT participant_2 FROM conversations WHERE id = conversation_id
  )
);

-- Ensure RLS is enabled
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
