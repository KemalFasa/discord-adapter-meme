// Credits to https://docs.discord.food/

type Snowflake = string;

export interface DiscordClientInfo {
  /**
   * The type of client
   */
  client: string;
  /**
   * The operating system of the client
   */
  os: string;
  /**
   * The version of the client type (e.g. 5 for the PS5)
   */
  version: number;
}

export interface DiscordActivityTimestamps {
  /**
   * Unix time (in milliseconds) of when the activity starts
   */
  start?: string;
  /**
   * Unix time (in milliseconds) of when the activity ends
   */
  end?: string;
}
export interface DiscordActivityEmoji {
  /**
   * The name of the emoji
   */
  name: string;
  /**
   * The ID of the emoji
   */
  id?: Snowflake;
  /**
   * Whether this emoji is animated
   */
  animated?: boolean;
}

export interface DiscordActivityParty {
  /**
   * The ID of the party (max 128 characters)
   */
  id?: string;
  /**
   * The party's current and maximum size (current_size, max_size)
   */
  size?: [number, number];
}
export interface DiscordActivityAssets {
  /**
   * The large activity asset image (max 313 characters)
   */
  large_image?: string;
  /**
   * Text displayed when hovering over the large image of the activity (max 128 characters)
   */
  large_text?: string;
  /**
   * URL that is opened when clicking on the large image (max 256 characters)
   */
  large_url?: string;
  /**
   * The small activity asset image (max 313 characters)
   */
  small_image?: string;
  /**
   * Text displayed when hovering over the small image of the activity (max 128 characters)
   */
  small_text?: string;
  /**
   * URL that is opened when clicking on the small image (max 256 characters)
   */
  small_url?: string;
  /**
   * The activity asset image to use for invites (max 313 characters)
   */
  invite_cover_image?: string;
}

export interface DiscordActivity {
  /**
   * The ID of the activity; only unique across a single user's activities
   */
  id: string;
  /**
   * The name of the activity (1-128 characters)
   */
  name: string;
  /**
   * The activity type
   */
  type: number;
  /**
   * The stream URL (max 512 characters)
   */
  url?: string | null;
  /**
   * Unix timestamp (in milliseconds) of when the activity was added to the user's session
   */
  created_at: number;
  /**
   * The ID of the session associated with the activity
   */
  session_id?: string | null;
  /**
   * The platform the activity is being played on
   */
  platform?: string;
  /**
   * The platforms the activity is supported on (max 10)
   */
  supported_platforms?: string[];
  /**
   * Unix timestamps (in milliseconds) for start and/or end of the game
   */
  timestamps?: DiscordActivityTimestamps;
  /**
   * The ID of the application representing the game the user is playing
   */
  application_id?: Snowflake;
  /**
   * The ID of the parent application representing the game the user is playing
   */
  parent_application_id?: Snowflake;
  /**
   * Which field is displayed in the user's status text in the member list
   */
  status_display_type?: number | null;
  /**
   * What the user is currently doing (max 128 characters)
   */
  details?: string | null;
  /**
   * URL that is opened when clicking on the details text (max 256 characters)
   */
  details_url?: string | null;
  /**
   * The user's current party status, or text used for a custom status (max 128 characters)
   */
  state?: string | null;
  /**
   * URL that is opened when clicking on the state text (max 256 characters)
   */
  state_url?: string | null;
  /**
   * The ID of the synced activity (e.g. Spotify song ID)
   */
  sync_id?: string;
  /**
   * The activity's flags
   */
  flags?: number;
  /**
   * Custom buttons shown in rich presence (max 2)
   */
  buttons?: string[];
  /**
   * The emoji used for a custom or hang status
   */
  emoji?: DiscordActivityEmoji | null;
  /**
   * Information for the current party of the user
   */
  party?: DiscordActivityParty;
  /**
   * Images for the presence and their hover texts
   */
  assets?: DiscordActivityAssets;
  /**
   * Secrets for rich presence joining and spectating
   */
  //   secrets?: ActivitySecrets;
  //   /**
  //    * Additional metadata for the activity
  //    */
  //   metadata?: ActivityMetadata;
}

export interface DiscordSession {
  /**
   * The ID of the session
   */
  session_id: string;
  /**
   * Information about the client that spawned the session
   */
  client_info: DiscordClientInfo;
  /**
   * The status of the session
   */
  status: string;
  /**
   * The current activities the session is partaking in
   */
  activities: DiscordActivity[];
  /**
   * Activities that are hidden from the public
   */
  hidden_activities: DiscordActivity[];
  /**
   * Unknown
   */
  active?: boolean;
}

export interface DiscordReactionCountDetails {
  /**
   * Amount of times this emoji has been used to react normally
   */
  normal: number;
  /**
   * Amount of times this emoji has been used to burst-react
   */
  burst: number;
}

export interface DiscordPartialEmoji {
  /**
   * The ID of the emoji
   */
  id: Snowflake | null;
  /**
   * The name of the emoji (2-32 characters)
   */
  name: string;
  /**
   * The roles allowed to use the emoji
   */
  roles?: Snowflake[];
  /**
   * The user that uploaded the emoji
   */
  user?: DiscordPartialUser;
  /**
   * Whether this emoji must be wrapped in colons
   */
  require_colons?: boolean;
  /**
   * Whether this emoji is managed
   */
  managed?: boolean;
  /**
   * Whether this emoji is animated
   */
  animated?: boolean;
  /**
   * Whether this emoji can be used; may be false due to loss of premium subscriptions (boosts)
   */
  available?: boolean;
}

export interface DiscordReaction {
  /**
   * Total amount of times this emoji has been used to react
   */
  count: number;
  /**
   * Details about the number of times this emoji has been used to react
   */
  count_details: DiscordReactionCountDetails;
  /**
   * Whether the current user reacted using this emoji
   */
  me: boolean;
  /**
   * Whether the current user burst-reacted using this emoji
   */
  me_burst: boolean;
  burst_me?: boolean;
  /**
   * Reaction emoji information
   */
  emoji: DiscordPartialEmoji;
  /**
   * The hex-encoded colors to render the burst reaction with
   */
  burst_colors: string[];
  /**
   * The amount of times this emoji has been used to burst-react
   */
  burst_count: number;
}

export type DiscordUser = any;
export type DiscordUserSettings = any;
export interface VersionedArray<T> {
  version: number;
  partial: boolean;
  entries: T[];
}
export type DiscordGatewayGuild = any;
export type DiscordPartialGuildJoinRequest = any;
export type DiscordRelationship = any;
export type DiscordGameRelationship = any;
export type DiscordChannel = any;
export type DiscordConnection = any;
export type DiscordPresence = any;
export type DiscordMergedPresences = any;
export type DiscordPartialUser = any;
export type DiscordLinkedUser = any;
export type DiscordGatewayApplication = any;
export type DiscordConsents = any;
export type DiscordTutorial = any;
export type DiscordUserExperiment = any;
export type DiscordGuildExperiment = any;
export type DiscordApexExperiments = any;
export type DiscordPayment = any;
export type DiscordGatewayFeatureFlags = any;
export type DiscordLobby = any;
export type DiscordUserApplicationProfile = any;
export type DiscordConsoleConnectionRequestData = any;
export type DiscordNotificationSettings = any;
export type DiscordAvatarDecorationData = any;
export type DiscordCollectibles = any;
export type DiscordDisplayNameStyle = any;

export interface DiscordReadState {
  /**
   * The ID of the resource the read state is for
   */
  id: Snowflake;
  /**
   * The type of read state (default CHANNEL )
   */
  read_state_type?: number;
  /**
   * The ID of the last acknowledged message
   */
  last_message_id?: Snowflake;
  /**
   * The ID of the last acknowledged entity
   */
  last_acked_id?: Snowflake;
  /**
   * The number of unread mentions
   */
  mention_count?: number;
  /**
   * The number of unread badges
   */
  badge_count?: number;
  /**
   * When the last acknowledged pinned message was pinned
   */
  last_pin_timestamp?: string;
  /**
   * The read state flags
   */
  flags?: number;
  /**
   * When the resource was last viewed (in days since the Discord epoch)
   */
  last_viewed?: number | null;
}

export interface DiscordMuteConfig {
  /**
   * Timestamp representing when the mute ends
   */
  end_time?: string | null;
  /**
   * Duration of the mute in seconds, or -1 for indefinite
   */
  selected_time_window?: number;
}

export interface DiscordChannelOverride {
  /**
   * The ID of the channel
   */
  channel_id: Snowflake;
  /**
   * Whether the category channel is collapsed
   */
  collapsed: boolean;
  /**
   * The channel override's flags
   */
  flags?: number;
  /**
   * The message notification level for the channel
   */
  message_notifications: number;
  /**
   * Whether the channel is muted
   */
  muted: boolean;
  /**
   * The mute metadata for the channel
   */
  mute_config: DiscordMuteConfig | null;
}

export interface DiscordUserGuildSettings {
  /**
   * The overrides for channels
   */
  channel_overrides: DiscordChannelOverride[];
  /**
   * The user guild settings flags
   */
  flags: number;
  /**
   * The ID of the guild
   */
  guild_id: Snowflake | null;
  /**
   * Whether to hide muted channels from the UI
   */
  hide_muted_channels: boolean;
  /**
   * The message notification level for the guild
   */
  message_notifications: number;
  /**
   * Whether to send push notifications to mobile clients
   */
  mobile_push: boolean;
  /**
   * Whether new guild scheduled event notifications are muted
   */
  mute_scheduled_events: boolean;
  /**
   * Whether the guild is muted
   */
  muted: boolean;
  /**
   * The mute metadata for the guild
   */
  mute_config: DiscordMuteConfig | null;
  /**
   * The highlight notification level for the guild
   */
  notify_highlights: number;
  /**
   * Whether to suppress @everyone notifications
   */
  suppress_everyone: boolean;
  /**
   * Whether to suppress role notifications
   */
  suppress_roles: boolean;
  /**
   * The version of guild settings
   */
  version: number;
}

export interface DiscordGuildMember {
  /**
   * The user this guild member represents
   */
  user: DiscordPartialUser;
  /**
   * The guild-specific nickname of the member (1-32 characters)
   */
  nick?: string | null;
  /**
   * The member's guild avatar hash
   */
  avatar?: string | null;
  /**
   * The member's guild avatar decoration
   */
  avatar_decoration_data?: DiscordAvatarDecorationData | null;
  /**
   * The member's equipped collectibles
   */
  collectibles?: DiscordCollectibles | null;
  /**
   * The member's display name style
   */
  display_name_styles?: DiscordDisplayNameStyle | null;
  /**
   * The member's guild banner hash
   */
  banner?: string | null;
  /**
   * The member's guild-specific bio (max 190 characters)
   */
  bio?: string | null;
  /**
   * The role IDs assigned to this member
   */
  roles: Snowflake[];
  /**
   * When the user joined the guild
   */
  joined_at: string;
  /**
   * When the member subscribed to (started boosting ) the guild
   */
  premium_since?: string | null;
  /**
   * Whether the member is deafened in voice channels
   */
  deaf?: boolean;
  /**
   * Whether the member is muted in voice channels
   */
  mute?: boolean;
  /**
   * Whether the member has not yet passed the guild's member verification requirements
   */
  pending?: boolean;
  /**
   * When the member's timeout will expire and they will be able to communicate in the guild again
   */
  communication_disabled_until?: string | null;
  /**
   * When the member's unusual DM activity flag will expire
   */
  unusual_dm_activity_until?: string | null;
  /**
   * The member's flags
   */
  flags: number;
  /**
   * Total permissions of the member in the guild
   */
  permissions?: string;
}

export interface DiscordReady {
  /**
   * An array of stringified JSON values representing the connection trace, used for debugging
   */
  _: string[];
  /**
   * API version
   */
  v: number;
  /**
   * The connected user
   */
  user: DiscordUser;
  /**
   * The client settings for the user
   * @deprecated
   */
  user_settings?: DiscordUserSettings;
  /**
   * The base64-encoded serialized preloaded user settings protobuf for the user, (if missing, defaults should be used)
   */
  user_settings_proto?: string;
  /**
   * The notification settings for the user
   */
  notification_settings: DiscordNotificationSettings;
  /**
   * The user settings for each guild
   */
  user_guild_settings: VersionedArray<DiscordUserGuildSettings>;
  /**
   * The user read states
   */
  read_state: VersionedArray<DiscordReadState>;
  /**
   * The guilds the user is in
   */
  guilds: DiscordGatewayGuild[];
  /**
   * Active guild join requests the user has
   */
  guild_join_requests: DiscordPartialGuildJoinRequest[];
  /**
   * The relationships the user has with other users
   */
  relationships: DiscordRelationship[];
  /**
   * The game relationships the user has with other users
   */
  game_relationships: DiscordGameRelationship[];
  /**
   * The number of friend suggestions the user has
   */
  friend_suggestion_count?: number;
  /**
   * The DMs and group DMs the user is participating in
   */
  private_channels: DiscordChannel[];
  /**
   * The third-party accounts the user has linked
   */
  connected_accounts: DiscordConnection[];
  /**
   * A mapping of user IDs to notes the user has made for them
   */
  notes: Record<Snowflake, string>;
  /**
   * The presences of the user's non-offline friends and implicit relationships (depending on the NO_AFFINE_USER_IDS  Gateway capability )
   */
  presences: DiscordPresence[];
  /**
   * The presences of the user's non-offline friends and implicit relationships (depending on the NO_AFFINE_USER_IDS  Gateway capability ), and any guild presences sent at startup
   */
  merged_presences: DiscordMergedPresences;
  /**
   * Initial members for each of the user's guilds, in the same order as the guilds array
   */
  merged_members: DiscordGuildMember[][];
  /**
   * The deduped users across all objects in the event
   */
  users: DiscordPartialUser[];
  /**
   * The linked users connected to the account via Family Center
   */
  linked_users: DiscordLinkedUser[];
  /**
   * The application of the connected bot or OAuth2 application
   */
  application?: DiscordGatewayApplication;
  /**
   * The OAuth2 scopes the user has authorized for the application
   */
  scopes?: string[];
  /**
   * Unique session ID, used for resuming connections
   */
  session_id: string;
  /**
   * The type of session that was started
   */
  session_type: string;
  /**
   * The sessions that are currently active for the user
   */
  sessions: DiscordSession[];
  /**
   * A unique identifier for the client session, used for persistent DAVE public keys
   */
  static_client_session_id: string;
  /**
   * The hash of the auth session ID corresponding to the auth token used to connect
   */
  auth_session_id_hash: string;
  /**
   * The refreshed auth token for this user; if present, the client should discard the current auth token and use this in subsequent requests to the API
   */
  auth_token?: string;
  /**
   * The token used for analytical tracking requests
   */
  analytics_token: string;
  /**
   * The types of multi-factor authenticators the user has enabled
   */
  authenticator_types: number;
  /**
   * The action a user is required to take before continuing to use Discord
   */
  required_action?: string;
  /**
   * The detected ISO 3166-1 alpha-2 country code of the user's current IP address
   */
  country_code: string;
  /**
   * A geo-ordered list of RTC regions that can be used when when setting a voice channel's rtc_region or updating the client's voice state
   */
  geo_ordered_rtc_regions: string[];
  /**
   * The tracking features the user has consented to
   */
  consents: DiscordConsents;
  /**
   * The tutorial state of the user, if any
   */
  tutorial: DiscordTutorial | null;
  /**
   * The shard information (shard_id, num_shards) associated with this session, if sharded
   */
  shard?: [number, number];
  /**
   * WebSocket URL for resuming connections
   */
  resume_gateway_url: string;
  /**
   * The API code version, used when re-identifying with client state v2
   */
  api_code_version: number;
  /**
   * User experiment rollouts for the user
   */
  experiments: DiscordUserExperiment[];
  /**
   * Guild experiment rollouts for the user
   */
  guild_experiments: DiscordGuildExperiment[];
  /**
   * Apex experiment assignments for the APP surface
   */
  apex_experiments?: DiscordApexExperiments;
  /**
   * The latest version of the explicit content scan filter feature
   */
  explicit_content_scan_version: number;
  /**
   * The pending payments
   */
  pending_payments?: DiscordPayment[];
  /**
   * The minimum supported version of the DAVE protocol in eligible voice connection
   */
  av_sf_protocol_floor?: number;
  /**
   * Social layer SDK feature flags
   */
  feature_flags?: DiscordGatewayFeatureFlags;
  /**
   * The lobbies the connected user is in
   */
  lobbies?: DiscordLobby[];
  /**
   * A mapping of user IDs to provisional user accounts application profiles encountered across all objects in the event
   */
  user_application_profiles?: Record<
    Snowflake,
    DiscordUserApplicationProfile[]
  >;
  /**
   * Pending connection request data
   */
  connection_request_data?: DiscordConsoleConnectionRequestData;
}

export const DiscordUserFlags = {
  /**
   * Discord Staff
   *
   * Value: 1 << 0
   * Public: Yes
   */
  STAFF: 1n << 0n,
  /**
   * Partnered Server Owner
   *
   * Public: Yes
   */
  PARTNER: 1n << 1n,
  /**
   * HypeSquad Events
   *
   * Public: Yes
   */
  HYPESQUAD: 1n << 2n,
  /**
   * Level 1 Discord Bug Hunter
   *
   * Public: Yes
   */
  BUG_HUNTER_LEVEL_1: 1n << 3n,
  /**
   * SMS enabled as a multi-factor authentication backup
   *
   * Public: No
   */
  MFA_SMS: 1n << 4n,
  /**
   * User has dismissed the current premium (Nitro) promotion
   *
   * Public: No
   */
  PREMIUM_PROMO_DISMISSED: 1n << 5n,
  /**
   * HypeSquad Bravery
   *
   * Public: Yes
   */
  HYPESQUAD_ONLINE_HOUSE_1: 1n << 6n,
  /**
   * HypeSquad Brilliance
   *
   * Public: Yes
   */
  HYPESQUAD_ONLINE_HOUSE_2: 1n << 7n,
  /**
   * HypeSquad Balance
   *
   * Public: Yes
   */
  HYPESQUAD_ONLINE_HOUSE_3: 1n << 8n,
  /**
   * Early Premium (Nitro) Supporter
   *
   * Public: Yes
   */
  PREMIUM_EARLY_SUPPORTER: 1n << 9n,
  /**
   * User is a Team
   *
   * Public: Yes
   */
  TEAM_PSEUDO_USER: 1n << 10n,
  /**
   * User is registered on Discord's HubSpot customer platform, used for official Discord programs (e.g. partner)
   *
   * Public: No 1
   */
  IS_HUBSPOT_CONTACT: 1n << 11n,
  /**
   * User has unread urgent system messages; an urgent message is one sent from Trust and Safety
   *
   * Public: No
   */
  HAS_UNREAD_URGENT_MESSAGES: 1n << 13n,
  /**
   * Level 2 Discord Bug Hunter
   *
   * Public: Yes
   */
  BUG_HUNTER_LEVEL_2: 1n << 14n,
  /**
   * User is scheduled for deletion for being under the minimum required age
   *
   * Public: No 1
   */
  UNDERAGE_DELETED: 1n << 15n,
  /**
   * Verified Bot
   *
   * Public: Yes
   */
  VERIFIED_BOT: 1n << 16n,
  /**
   * Early Verified Bot Developer
   *
   * Public: Yes
   */
  VERIFIED_DEVELOPER: 1n << 17n,
  /**
   * Moderator Programs Alumni
   *
   * Public: Yes
   */
  CERTIFIED_MODERATOR: 1n << 18n,
  /**
   * Bot uses only HTTP interactions and is shown in the online member list
   *
   * Public: Yes
   */
  BOT_HTTP_INTERACTIONS: 1n << 19n,
  /**
   * User is marked as a spammer and has their messages collapsed in the UI
   *
   * Public: Yes
   */
  SPAMMER: 1n << 20n,
  /**
   * User is a provisional account used with the social layer integration
   *
   * Public: Yes
   */
  PROVISIONAL_ACCOUNT: 1n << 23n,
  /**
   * User has their global ratelimit raised to 1,200 requests per second
   *
   * Public: No 1
   */
  HIGH_GLOBAL_RATE_LIMIT: 1n << 33n,
  /**
   * User's account is deleted
   *
   * Public: No 1
   */
  DELETED: 1n << 34n,
  /**
   * User's account is disabled for suspicious activity and must reset their password to regain access
   *
   * Public: No 1
   */
  DISABLED_SUSPICIOUS_ACTIVITY: 1n << 35n,
  /**
   * User deleted their own account
   *
   * Public: No 1
   */
  SELF_DELETED: 1n << 36n,
  /**
   * User has a premium (Nitro) custom discriminator
   *
   * Public: No 1
   */
  PREMIUM_DISCRIMINATOR: 1n << 37n,
  /**
   * User has used the desktop client
   *
   * Public: No 1
   */
  USED_DESKTOP_CLIENT: 1n << 38n,
  /**
   * User has used the web client
   *
   * Public: No 1
   */
  USED_WEB_CLIENT: 1n << 39n,
  /**
   * User has used the mobile client
   *
   * Public: No 1
   */
  USED_MOBILE_CLIENT: 1n << 40n,
  /**
   * User's account is disabled
   *
   * Public: No 1
   */
  DISABLED: 1n << 41n,
  /**
   * User has started at least one Gateway session and is now eligible to send messages
   *
   * Public: No 1
   */
  HAS_SESSION_STARTED: 1n << 43n,
  /**
   * User is quarantined and cannot create DMs or accept invites
   *
   * Public: No
   */
  QUARANTINED: 1n << 44n,
  /**
   * User is eligible for early access to unique usernames
   *
   * Public: No 1
   */
  PREMIUM_ELIGIBLE_FOR_UNIQUE_USERNAME: 1n << 47n,
  /**
   * User is a collaborator and is considered staff
   *
   * Public: No
   */
  COLLABORATOR: 1n << 50n,
  /**
   * User is a restricted collaborator and is considered staff
   *
   * Public: No
   */
  RESTRICTED_COLLABORATOR: 1n << 51n,
} as const;

export const DiscordMessageFlags = {
  /**
   * Message has been published to subscribed channels (via Channel Following)
   *
   * Value: 1 << 0
   */
  CROSSPOSTED: 1 << 0,
  /**
   * Message originated from a message in another channel (via Channel Following)
   */
  IS_CROSSPOST: 1 << 1,
  /**
   * Embeds will not be included when serializing this message
   */
  SUPPRESS_EMBEDS: 1 << 2,
  /**
   * Source message for this crosspost has been deleted (via Channel Following)
   */
  SOURCE_MESSAGE_DELETED: 1 << 3,
  /**
   * Message came from the urgent message system
   */
  URGENT: 1 << 4,
  /**
   * Message has an associated thread, with the same ID as the message
   */
  HAS_THREAD: 1 << 5,
  /**
   * Message is only visible to the user who invoked the interaction
   */
  EPHEMERAL: 1 << 6,
  /**
   * Message is an interaction response and the bot is "thinking"
   */
  LOADING: 1 << 7,
  /**
   * Some roles were not mentioned and added to the thread
   */
  FAILED_TO_MENTION_SOME_ROLES_IN_THREAD: 1 << 8,
  /**
   * Message is hidden from the guild's feed
   */
  GUILD_FEED_HIDDEN: 1 << 9,
  /**
   * Message contains a link that impersonates Discord
   */
  SHOULD_SHOW_LINK_NOT_DISCORD_WARNING: 1 << 10,
  /**
   * Message will not trigger push and desktop notifications
   */
  SUPPRESS_NOTIFICATIONS: 1 << 12,
  /**
   * Message's audio attachment is rendered as a voice message
   */
  IS_VOICE_MESSAGE: 1 << 13,
  /**
   * Message has a forwarded message snapshot attached
   */
  HAS_SNAPSHOT: 1 << 14,
  /**
   * Message contains components from version 2 of the UI kit
   */
  IS_COMPONENTS_V2: 1 << 15,
  /**
   * Message was triggered by the social layer integration
   */
  SENT_BY_SOCIAL_LAYER_INTEGRATION: 1 << 16,
} as const;

/**
 * For a list of known profile badges, refer to [this Gist](https://gist.github.com/XYZenix/c45156b7c883b5301c9028e39d71b479).
 */
export interface DiscordProfileBadge {
  /**
   * The reference ID of the badge
   */
  id: string;
  /**
   * A description of the badge
   */
  description: string;
  /**
   * The badge's icon hash
   */
  icon: string;
  /**
   * A link representing the badge
   */
  link?: string;
}

export interface DiscordProfileMetadata {
  /**
   * The guild ID this profile applies to, if it is a guild profile
   */
  guild_id?: Snowflake;
  /**
   * The user's pronouns (max 40 characters)
   */
  pronouns: string;
  /**
   * The user's bio (max 190 characters)
   */
  bio?: string;
  /**
   * The user's banner hash
   */
  banner?: string | null;
  /**
   * The user's banner color encoded as an integer representation of a hexadecimal color code
   */
  accent_color?: number | null;
  /**
   * The user's two theme colors encoded as an array of integers representing hexadecimal color codes
   */
  theme_colors?: [number, number];
  /**
   * The user's profile popout animation particle type
   */
  popout_animation_particle_type?: Snowflake | null;
  /**
   * The user's profile emoji
   */
  emoji?: DiscordPartialEmoji | null;
  /**
   * The user's profile effect
   */
  //   profile_effect?: ProfileEffect | null;
}
