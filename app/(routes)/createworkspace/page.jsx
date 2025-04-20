"use client";
import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/config/firebaseConfig';
import { useAuth, useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2Icon, SmilePlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import uuid4 from 'uuid4';
import { toast } from 'sonner';

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState('/cover.jpg');
  const [workspaceName, setWorkspaceName] = useState('');
  const [emoji, setEmoji] = useState('');
  const { user } = useUser();
  const { orgId } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const OnCreateWorkspace = async () => {
    if (!emoji) {
      toast.error("Please select an emoji before creating a workspace.");
      return;
    }

    setLoading(true);
    const workspaceId = Date.now();

    try {
      await setDoc(doc(db, 'Workspace', workspaceId.toString()), {
        workspaceName: workspaceName,
        emoji: emoji,
        coverImage: coverImage,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        id: workspaceId,
        orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress,
      });

      const docId = uuid4();
      await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
        workspaceId: workspaceId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        coverImage: null,
        emoji: null,
        id: docId,
        documentName: 'Untitled Document',
        documentOutput: [],
      });

      await setDoc(doc(db, 'documentOutput', docId.toString()), {
        docId: docId,
        output: [],
      });

      router.replace('/workspace/' + workspaceId + "/" + docId);
    } catch (error) {
      toast.error("Error creating workspace.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 md:px-36 lg:px-52 xl:px-80 py-20">
      <div className="shadow-2xl rounded-xl">
        {/* Cover Image */}
        <CoverPicker setNewCover={(v) => setCoverImage(v)}>
          <div className="relative group cursor-pointer">
            <h2 className="absolute p-4 w-full h-full flex items-center justify-center text-white font-bold text-2xl opacity-0 group-hover:opacity-100 group-hover:text-black group-hover:bg-white/100 transition-all duration-300">
              Change Cover
            </h2>
            <div className="group-hover:opacity-30">
              <Image
                src={coverImage}
                alt="Cover"
                width={400}
                height={150}
                className="w-full h-[160px] object-cover rounded-t-xl"
              />
            </div>
          </div>
        </CoverPicker>

        <div className="p-12">
          <h2 className="font-medium text-xl">Create a new workspace</h2>
          <h2 className="text-sm mt-2">
            This is a shared space where you can collaborate with your team. You
            can always rename it later.
          </h2>
          <div className="mt-7 flex gap-2 items-center">
            <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
              <Button type="button">{emoji ? emoji : <SmilePlus />}</Button>
            </EmojiPickerComponent>
            <Input
              placeholder="Workspace Name"
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>
          <div className="mt-7 flex justify-end">
            <Button
              type="button"
              disabled={!workspaceName?.length || loading}
              onClick={OnCreateWorkspace}
            >
              Create {loading && <Loader2Icon className="animate-spin ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;
