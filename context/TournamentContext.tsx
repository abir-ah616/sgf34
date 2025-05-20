import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Team {
  id: string;
  name: string;
  logo?: string;
  wins: number;
  pp: number;
  kp: number;
  total: number;
}

export interface SlotEntry {
  id: string;
  number: number;
  name: string;
  logo?: string;
}

export interface SocialTags {
  facebook: string;
  instagram: string;
  youtube: string;
  showSocial: boolean;
}

export interface MetaInfo {
  week: number;
  day: number;
  hostName: string;
  subtitle: string;
  showHostInfo: boolean;
  showLogo: boolean;
  logoUrl?: string;
}

interface TournamentContextType {
  teams: Team[];
  slots: SlotEntry[];
  meta: MetaInfo;
  socialTags: SocialTags;
  updateTeam: (team: Team) => void;
  updateSlot: (slot: SlotEntry) => void;
  updateMeta: (meta: Partial<MetaInfo>) => void;
  updateSocialTags: (tags: Partial<SocialTags>) => void;
  sortedTeams: Team[];
}

const defaultTeams: Team[] = Array(12).fill(null).map((_, index) => ({
  id: `team-${index + 1}`,
  name: `Team ${index + 1}`,
  logo: '',
  wins: 0,
  pp: 0,
  kp: 0,
  total: 0,
}));

const defaultSlots: SlotEntry[] = Array(12).fill(null).map((_, index) => ({
  id: `slot-${index + 1}`,
  number: index + 1,
  name: `Team ${index + 1}`,
  logo: '',
}));

const defaultMeta: MetaInfo = {
  week: 1,
  day: 1,
  hostName: 'Anything Host',
  subtitle: 'Presents',
  showHostInfo: true,
  showLogo: true,
  logoUrl: '',
};

const defaultSocialTags: SocialTags = {
  facebook: 'MR.OPPY',
  instagram: 'MR.OPPY',
  youtube: 'MR.OPPY',
  showSocial: true,
};

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>(defaultTeams);
  const [slots, setSlots] = useState<SlotEntry[]>(defaultSlots);
  const [meta, setMeta] = useState<MetaInfo>(defaultMeta);
  const [socialTags, setSocialTags] = useState<SocialTags>(defaultSocialTags);

  // Load data from storage on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        const teamsData = await AsyncStorage.getItem('teams');
        const slotsData = await AsyncStorage.getItem('slots');
        const metaData = await AsyncStorage.getItem('meta');
        const socialData = await AsyncStorage.getItem('socialTags');

        if (teamsData) setTeams(JSON.parse(teamsData));
        if (slotsData) setSlots(JSON.parse(slotsData));
        if (metaData) setMeta(JSON.parse(metaData));
        if (socialData) setSocialTags(JSON.parse(socialData));
      } catch (error) {
        console.error('Error loading data from storage:', error);
      }
    };

    loadData();
  }, []);

  // Save data to storage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('teams', JSON.stringify(teams));
        await AsyncStorage.setItem('slots', JSON.stringify(slots));
        await AsyncStorage.setItem('meta', JSON.stringify(meta));
        await AsyncStorage.setItem('socialTags', JSON.stringify(socialTags));
      } catch (error) {
        console.error('Error saving data to storage:', error);
      }
    };

    saveData();
  }, [teams, slots, meta, socialTags]);

  const updateTeam = (updatedTeam: Team) => {
    // Calculate the total
    const calculatedTeam = {
      ...updatedTeam,
      total: updatedTeam.pp + updatedTeam.kp
    };

    setTeams(prevTeams => 
      prevTeams.map(team => 
        team.id === calculatedTeam.id ? calculatedTeam : team
      )
    );
  };

  const updateSlot = (updatedSlot: SlotEntry) => {
    setSlots(prevSlots => 
      prevSlots.map(slot => 
        slot.id === updatedSlot.id ? updatedSlot : slot
      )
    );
  };

  const updateMeta = (updatedMeta: Partial<MetaInfo>) => {
    setMeta(prevMeta => ({ ...prevMeta, ...updatedMeta }));
  };

  const updateSocialTags = (updatedTags: Partial<SocialTags>) => {
    setSocialTags(prevTags => ({ ...prevTags, ...updatedTags }));
  };

  // Sort teams by total points (highest first)
  const sortedTeams = [...teams].sort((a, b) => b.total - a.total);

  return (
    <TournamentContext.Provider
      value={{
        teams,
        slots,
        meta,
        socialTags,
        updateTeam,
        updateSlot,
        updateMeta,
        updateSocialTags,
        sortedTeams,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = (): TournamentContextType => {
  const context = useContext(TournamentContext);
  if (context === undefined) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};