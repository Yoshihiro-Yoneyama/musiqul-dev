import { useState, useCallback } from "react";
import { useRecruitment } from "@/features/collab/recruitment/model/create/recruitment.state";
import { createRecruitment } from "@/features/collab/recruitment/model/create/createRecruitment";

export const useCreateRecruitmentForm = (onSubmitSuccess?: () => void) => {
  const [ownerInstruments, setOwnerInstruments] = useState<string[]>([]);
  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [name, setName] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [deadline, setDeadline] = useState('');
  const [requiredGenerations, setRequiredGenerations] = useState<string[]>([]);
  const [requiredGenders, setRequiredGenders] = useState<string[]>([]);
  const [recruitedInstruments, setRecruitedInstruments] = useState<Map<string, number>>(new Map());
  const [memo, setMemo] = useState('');
  const [requiredInstrumentInputs, setRequiredInstrumentInputs] = useState<
    { id: number; selectedString: string; selectedNumber: number }[]
  >([{ id: 1, selectedString: "", selectedNumber: 0 }]);
  const [submitting, setSubmitting] = useState(false);
  
  const { updatedRecruitment, setUpdatedRecruitment } = useRecruitment();
  
  const handleOwnerInstrumentsChange = (values: string[]) => {
    setOwnerInstruments(values);
    setUpdatedRecruitment({
      ...updatedRecruitment,
      ownerInstruments: values || [],
    });
  };
  const handleSongTitleChange = (value: string) => {
    setSongTitle(value)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      songTitle: value || '',
    })
  }
  const handleArtistChange = (value: string) => {
    setArtist(value)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      artist: value || '',
    })
  }
  const handleNameChange = (value: string) => {
    setName(value)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      name: value || '',
    })
  }
  const handleGenresChange = (values: string[]) => {
    setGenres(values)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      genres: values || [],
    })
  }
  const handleDeadlineChange = (value: string) => {
    setDeadline(value)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      deadline: value || '',
    })
  }
  const handleRequiredGenerationsChange = (values: string[]) => {
    setRequiredGenerations(values)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      requiredGenerations: values || [],
    })
  }
  const handleRequiredGendersChange = (values: string[]) => {
    setRequiredGenders(values)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      requiredGenders: values || [],
    })
  }
  const handleComboInputChange = (id: number, stringValue: string, numberValue: number) => {
    setRequiredInstrumentInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id
          ? { ...input, selectedString: stringValue, selectedNumber: numberValue }
          : input
      )
    );
    setRecruitedInstruments((prevMap) => {
      const updatedMap = new Map(prevMap);
      if (numberValue === 0) {
        updatedMap.delete(stringValue);
      } else {
        updatedMap.set(stringValue, numberValue);
      }
      setUpdatedRecruitment({
        ...updatedRecruitment,
        recruitedInstruments: updatedMap,
      });
      return updatedMap;
    });
  };
  
  const handleAddInput = () => {
    const newId = requiredInstrumentInputs.length + 1;
    setRequiredInstrumentInputs([
      ...requiredInstrumentInputs,
      { id: newId, selectedString: "", selectedNumber: 0 },
    ]);
  };
  
  const handleMemoChange = (value: string) => {
    setMemo(value)
    setUpdatedRecruitment({
      ...updatedRecruitment,
      memo: value || ''
    })
  }
  
  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await createRecruitment(updatedRecruitment);
      if (onSubmitSuccess) onSubmitSuccess();
      // Reset the form state after successful submission
      setOwnerInstruments([]);
      setSongTitle('');
      setArtist('');
      setName('');
      setGenres([]);
      setDeadline('');
      setRequiredGenerations([]);
      setRequiredGenders([]);
      setRecruitedInstruments(new Map([]));
      setMemo('');
    } catch (error) {
      console.error('Error creating recruitment:', error);
    } finally {
      setSubmitting(false);
    }
  }, [updatedRecruitment, submitting, onSubmitSuccess]);
  
  return {
    ownerInstruments,
    setOwnerInstruments: handleOwnerInstrumentsChange,
    songTitle,
    setSongTitle: handleSongTitleChange,
    artist,
    setArtist: handleArtistChange,
    name,
    setName: handleNameChange,
    genres,
    setGenres: handleGenresChange,
    deadline,
    setDeadline: handleDeadlineChange,
    requiredGenerations,
    setRequiredGenerations: handleRequiredGenerationsChange,
    requiredGenders,
    setRequiredGenders: handleRequiredGendersChange,
    recruitedInstruments,
    setRecruitedInstruments,
    memo,
    setMemo: handleMemoChange,
    requiredInstrumentInputs,
    handleAddInput,
    handleComboInputChange,
    handleSubmit,
    submitting,
  };
};